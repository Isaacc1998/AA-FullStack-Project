import csrfFetch from "./csrf";
import { storeCSRFToken } from "./csrf";

const RECEIVE_SETS = "flashcardSet/receiveSets";
const RECEIVE_SET = "flashcardSet/receiveSet";
const CREATE_SET = "flashcardSet/createSet";
const DELETE_SET = "flashcardSet/deleteSet";
const UPDATE_SET = "flashcardSet/updateSet";

const receiveSets = (sets) => ({
  type: RECEIVE_SETS,
  sets,
});
const receiveSet = (set) => ({
  type: RECEIVE_SET,
  set,
});

const createSet = (set) => ({
  type: CREATE_SET,
  set,
});

const deleteSet = (setId) => ({
  type: DELETE_SET,
  setId,
});

const updateSet = (set) => ({
  type: UPDATE_SET,
  set,
});

export const getFlashcardSets = () => async (dispatch) => {
  const res = await csrfFetch("/api/flashcard_sets", { method: "GET" });
  const data = await res.json();
  dispatch(receiveSets(data));
};

export const getFlashcardSet = (setId) => async (dispatch) => {
  const res = await csrfFetch(`/api/flashcard_set/${setId}`);
  const data = await res.json();
  dispatch(receiveSet(data));
};

export const create = (set) => async (dispatch) => {
  const { title } = set;
  const res = await csrfFetch("api/flashcard_sets", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  dispatch(createSet(data));
};

export const remove = (setId) => async (dispatch) => {
  const res = await csrfFetch(`api/flashcard_sets/${setId}`, {
    method: "DELETE",
  });
  dispatch(deleteSet(setId));
  return res;
};

export const update = (set) => async (dispatch) => {
  const { title } = set;

  const res = await csrfFetch(`api/flashcard_sets/${set.id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  dispatch(updateSet(data));
};

const flashcardSetReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_SETS:
      return { ...newState, ...action.sets };
    case RECEIVE_SET:
      newState[action.set.id] = action.set;
      return newState;
    case CREATE_SET:
      return { ...newState, set: action.set };
    //change set to flashcardSet? or flashcard_set?
    case UPDATE_SET:
      newState[action.set.id] = action.set;
      return newState;
    case DELETE_SET:
      return { ...state, set: null };
    //change set to flashcardSet? or flashcard_set?
    default:
      return state;
  }
};

export default flashcardSetReducer;
