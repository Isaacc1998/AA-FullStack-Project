import csrfFetch from "./csrf";

const RECEIVE_USER = "user/receiveUser";
const REMOVE_USERS = "user/removeUsers";

export const removeUsers = (users = {}) => ({
  type: REMOVE_USERS,
  users,
});
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const getUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  console.log(data);
  dispatch(receiveUser(data));
  return data.user;
};

const userReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_USER:
      console.log(action.user);
      newState[action.user.user.id] = action.user;
      return newState;
    case REMOVE_USERS:
      return {};
    default:
      return state;
  }
};

export default userReducer;
