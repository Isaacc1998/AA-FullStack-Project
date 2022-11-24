import csrfFetch from "./csrf";

const RECEIVE_FLASHCARDS = "flashcard/receiveFlashcards";
const RECEIVE_FLASHCARD = "flashcard/receiveFlashcard";
const CREATE_FLASHCARD = "flashcard/createFlashcard";
const DELETE_FLASHCARD = "flashcard/deleteFlashcard";
const UPDATE_FLASHCARD = "flashcard/updateFlashcard";
const RESET_CARDS = "flashcard/resetCards";

export const resetCards = (flashcards = {}) => ({
  type: RESET_CARDS,
  flashcards,
});
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
  const res = await csrfFetch(`/api/flashcard_sets/${setId}/flashcards`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  dispatch(receiveFlashcards(data));
};

export const getFlashcard = (params) => async (dispatch) => {
  const { flashcardId, setId } = params;
  const res = await csrfFetch(
    `/api/flashcard_sets/${setId}/flashcards/${flashcardId}`
  );
  const data = await res.json();
  dispatch(receiveFlashcard(data));
};

export const create = (params) => async (dispatch) => {
  // const { front, back, set_id } = params;
  const { formData, set_id } = params;
  console.log(formData, "formdata2");
  for (var key of formData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }
  const res = await csrfFetch(`/api/flashcard_sets/${set_id}/flashcards`, {
    method: "POST",
    // body: JSON.stringify({ front, back, set_id }),
    body: formData,
  });
  const data = await res.json();
  dispatch(createFlashcard(data));
  // return data;
};

export const update = (params) => async (dispatch) => {
  // const { id, front, back, set_id } = flashcard;
  const { formData, set_id, id } = params;

  const res = await csrfFetch(
    `/api/flashcard_sets/${set_id}/flashcards/${id}`,
    {
      method: "PUT",
      // body: JSON.stringify({
      //   front,
      //   back,
      //   set_id,
      // }),
      body: formData,
    }
  );
  const data = await res.json();
  console.log(data);
  dispatch(updateFlashcard(data));
};

export const removeState = (params) => async (dispatch) => {
  const { flashcardId, set_id } = params;
  // const res = await csrfFetch(
  //   `/api/flashcard_sets/${set_id}/flashcards/${flashcardId}`,
  //   {
  //     method: "DELETE",
  //   }
  // );
  dispatch(deleteFlashcard(flashcardId));
  // return res;
};

export const remove = (params) => async (dispatch) => {
  const { flashcardId, set_id } = params;
  const res = await csrfFetch(
    `/api/flashcard_sets/${set_id}/flashcards/${flashcardId}`,
    {
      method: "DELETE",
    }
  );
  dispatch(deleteFlashcard(flashcardId));
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
      // newState[action.flashcard.id] = action.set;
      return newState;
    case DELETE_FLASHCARD:
      delete newState[action.flashcardId];
      return newState;
    case RESET_CARDS:
      return {};
    default:
      return state;
  }
};

export default flashcardReducer;
