import csrfFetch from "./csrf";

const RECEIVE_USER = "user/receiveUser";
const REMOVE_USERS = "user/removeUsers";
const UPDATE_USER = "user/updateUser";

const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const removeUsers = (users = {}) => ({
  type: REMOVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const update = (params) => async (dispatch) => {
  const { formData, id } = params;
  // console.log(id, "formdata2");
  // for (var key of formData.entries()) {
  //   console.log(key[0] + ", " + key[1]);
  // }
  const res = await csrfFetch(`/api/users/${id}`, {
    method: "PUT",
    body: formData,
  });
  const data = await res.json();
  dispatch(updateUser(data));
};

export const getUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(receiveUser(data));
  return data.user;
};

const userReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_USER:
      // newState[action.user.id] = action.user;
      // return newState;
      return { ...state, ...action.user };
    case REMOVE_USERS:
      return {};
    case UPDATE_USER:
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default userReducer;
