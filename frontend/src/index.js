import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import csrfFetch, { restoreCSRF } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as setActions from "./store/flashcardSet";
import * as flashcardActions from "./store/flashcard";
import * as userActions from "./store/user";
import * as historyActions from "./store/history";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.setActions = setActions;
  window.flashcardActions = flashcardActions;
  window.userActions = userActions;
  window.historyActions = historyActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}
