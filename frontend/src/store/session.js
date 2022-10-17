import csrfFetch from "./csrf";
import { storeCSRFToken } from "./csrf";

const CREATE_SESSION = "session/createSession";
const REMOVE_SESSION = "session/removeSession";

const createSession = (user) => ({
  type: CREATE_SESSION,
  user,
});

const removeSession = () => ({
  type: REMOVE_SESSION,
});

const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
};

// const storeCSRFToken = (response) => {
//   const csrfToken = response.headers.get("X-CSRF-Token");
//   if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// };

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(createSession(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(createSession(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  storeCurrentUser(null);
  dispatch(removeSession());
};

export const signup = (user) => async (dispatch) => {
  const { email, username, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(createSession(data.user));
  return response;
};

const sessionReducer = (
  state = {
    user: JSON.parse(sessionStorage.getItem("currentUser")),
  },
  action
) => {
  //   let newState = { ...state };
  switch (action.type) {
    case CREATE_SESSION:
      return { ...state, user: action.user };
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
