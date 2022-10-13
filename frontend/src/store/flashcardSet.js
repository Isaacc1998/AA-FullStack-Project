import csrfFetch from "./csrf";
import { storeCSRFToken } from "./csrf";

const CREATE_SET = "flashcardSet/createSet";
const DELETE_SET = "flashcardSet/deleteSet";
const UPDATE_SET = "flashcardSet/updateSet";

const createSet = (set) => {
  type: CREATE_SET;
  set;
};

const deleteSet = (set) => {
  type: DELETE_SET;
  set;
};

const updateSet = (set) => {
  type: UPDATE_SET;
  set;
};

const getFlashcardSets = () => {
  const res = fetch("/api/flashcard_sets");
};

const flashcardSetReducer = (state = {}, action) => {
  switch (action.type) {
  }
};

export default flashcardSetReducer;
