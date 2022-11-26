import csrfFetch from "./csrf";
import { storeCSRFToken } from "./csrf";

const RECEIVE_SETS = "flashcardSet/receiveSets";
const RECEIVE_SET = "flashcardSet/receiveSet";
const CREATE_SET = "flashcardSet/createSet";
const DELETE_SET = "flashcardSet/deleteSet";
const UPDATE_SET = "flashcardSet/updateSet";
const RESET_SETS = "flashcardSet/resetSets";
const RECEIVE_USER_SETS = "flashcardSet/receiveUserSets";

const receiveUserSets = (sets) => ({
  type: RECEIVE_USER_SETS,
  sets,
});

export const resetSets = () => ({
  type: RESET_SETS,
});

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

export const getAllFlashcardSets = () => async (dispatch) => {
  const res = await csrfFetch("/api/flashcard_sets", { method: "GET" });
  const data = await res.json();
  dispatch(receiveSets(data));
};

//add user as params to make dynamically get flashcard set based on user profile
export const getUserFlashcardSets = () => async (dispatch) => {
  const res = await csrfFetch("/api/users", {
    method: "GET",
  });
  const data = await res.json();

  dispatch(receiveUserSets(data));
};

// export const getRecentFlashcardSets = () => async (dispatch) => {};

export const getFlashcardSet = (setId) => async (dispatch) => {
  const res = await csrfFetch(`/api/flashcard_sets/${setId}`);
  const data = await res.json();
  dispatch(receiveSet(data));
};

export const create = (set) => async (dispatch) => {
  const { title } = set;
  const res = await csrfFetch("/api/flashcard_sets", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  dispatch(createSet(data));
  console.log(data);
  // return Object.keys(data)[0].id;
};

export const remove = (setId) => async (dispatch) => {
  const res = await csrfFetch(`/api/flashcard_sets/${setId}`, {
    method: "DELETE",
  });
  dispatch(deleteSet(setId));
  return res;
};

export const update = (set) => async (dispatch) => {
  const { title, setId } = set;

  const res = await csrfFetch(`/api/flashcard_sets/${setId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  console.log(data);
  dispatch(updateSet(data));
};

const flashcardSetReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_SETS:
      // console.log(action.sets, "boy");
      // let newObj = {};
      // action.sets.forEach((obj) => {
      //   newObj[obj.id] = obj;
      // });
      // console.log(newObj, "newobj dadi");

      return { ...newState, ...action.sets };
    case RECEIVE_SET:
      newState[action.set] = action.set;
      return newState;
    case CREATE_SET:
      return { ...newState, ...action.set };
    case UPDATE_SET:
      // newState[action.set.flashcardSets.id] = action.set;
      newState[action.set.setId] = action.set;
      return newState;
    case DELETE_SET:
      delete newState[action.setId];
      return newState;
    case RESET_SETS:
      return {};
    case RECEIVE_USER_SETS:
      return { ...newState, userSets: action.sets };
    default:
      return state;
  }
};

export default flashcardSetReducer;
