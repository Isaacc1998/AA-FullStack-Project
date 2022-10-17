import csrfFetch from "./csrf";

const RECEIVE_FLASHCARDS = "flashcard/receiveFlashcards";
const RECEIVE_FLASHCARD = "flashcard/receiveFlashcard";
const CREATE_FLASHCARD = "flashcard/createFlashcard";
const DELETE_FLASHCARD = "flashcard/deleteFlashcard";
const UPDATE_FLASHCARD = "flashcard/updateFlashcard";

const receiveFlashcards = (flashcards) => ({
  type: RECEIVE_FLASHCARDS,
  flashcards,
});

const receiveFlashcard = (flashcard) => ({
  type: RECEIVE_FLASHCARD,
  flashcard,
});

const createFlashcard = (flashcard) => ({
  type: CREATE_FLASHCARD,
  flashcard,
});

const deleteFlashcard = (flashcardId) => ({
  type: DELETE_FLASHCARD,
  flashcardId,
});

const updateFlashcard = (flashcard) => ({
  type: UPDATE_FLASHCARD,
  flashcard,
});

export const getFlashcards = (setId) => async (dispatch) => {
  console.log(setId);
  const res = await csrfFetch(`/api/flashcards/?setId=${setId}`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  dispatch(receiveFlashcards(data));
};

export const getFlashcard = (flashcardId) => async (dispatch) => {
  const res = await csrfFetch(`api/flashcards/${flashcardId}`);
  const data = await res.json();
  dispatch(receiveFlashcard(data));
};

export const create = (flashcard) => async (dispatch) => {
  const { front, back, set_id } = flashcard;
  const res = await csrfFetch("/api/flashcards", {
    method: "POST",
    body: JSON.stringify({
      front,
      back,
      set_id,
    }),
  });
  const data = await res.json();
  console.log("test");
  dispatch(createFlashcard(data));
};

export const update = (flashcard) => async (dispatch) => {
  const { front, back } = flashcard;
  const res = await csrfFetch(`api/flashcards/${flashcard.id}`, {
    method: "PUT",
    body: JSON.stringify({
      front,
      back,
    }),
  });
  const data = await res.json();
  dispatch(updateFlashcard(data));
};

export const remove = (flashcardId) => async (dispatch) => {
  const res = await csrfFetch(`api/flashcards/${flashcardId}`, {
    method: "DELETE",
  });
  dispatch(deleteFlashcard(flashcardId));
  return res;
};

const flashcardReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_FLASHCARDS:
      return { ...newState, ...action.flashcards };
    case RECEIVE_FLASHCARD:
      newState[action.flashcard.flashcards.id] = action.set;
      return newState;
    case CREATE_FLASHCARD:
      return { ...newState, ...action.flashcard };
    case UPDATE_FLASHCARD:
      newState[action.flashcard.flashcards.id] = action.set;
      return newState;
    case DELETE_FLASHCARD:
      delete newState[action.flashcardId];
      return newState;
    default:
      return state;
  }
};

export default flashcardReducer;
