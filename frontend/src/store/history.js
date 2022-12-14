import csrfFetch from "./csrf";

const RECEIVE_HISTORIES = "history/receiveHistories";
const RECEIVE_HISTORY = "history/receiveHistory";
const UPDATE_HISTORY = "history/updateHistory";
const CREATE_HISTORY = "history/createHistory";

const receiveHistories = (histories) => ({
  type: RECEIVE_HISTORIES,
  histories,
});

const receiveHistory = (history) => ({
  type: RECEIVE_HISTORY,
  history,
});

const createHistory = (history) => ({
  type: CREATE_HISTORY,
  history,
});

const updateHistory = (history) => ({
  type: UPDATE_HISTORY,
  history,
});

export const getHistories = () => async (dispatch) => {
  const res = await csrfFetch("/api/histories");
  const data = await res.json();
  console.log("hit histories");
  console.log(data);
  dispatch(receiveHistories(data));
};

export const create = () => async (dispatch) => {
  const res = await csrfFetch("/api/histories", {
    method: "POST",
  });
  const data = await res.json();
  dispatch(createHistory(data));
};

export const update = (params) => async (dispatch) => {
  const { formData, id } = params;
  const res = await csrfFetch(`/api/hstories/${id}`, {
    method: "PUT",
    body: formData,
  });
  const data = await res.json();
  dispatch(updateHistory(data));
};

const historyReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_HISTORIES:
      return { ...newState, ...action.histories };
    case CREATE_HISTORY:
      return { ...newState, ...action.history };
    case UPDATE_HISTORY:
      return { ...state, ...action.history };
    default:
      return state;
  }
};

export default historyReducer;
