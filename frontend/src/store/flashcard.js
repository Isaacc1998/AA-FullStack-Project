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

export const getFlashcard = (flashcardId) => async (dispatch) => {
  const res = await csrfFetch(`api/flashcards/${flashcardId}`);
  const data = await res.json();
  dispatch(receiveFlashcard(data));
};

export const create = (flashcard) => async (dispatch) => {
  const { front, back } = flashcard;
  const res = await csrfFetch("api/flashcards", {
    method: "POST",
    body: JSON.stringify({
      front,
      back,
      set_id,
    }),
  });
  const data = await res.json();
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

const flashcardReducer = (state = {}, action) => {};

export default flashcardReducer;
