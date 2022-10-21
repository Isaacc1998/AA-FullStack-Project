import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import flashcardSetReducer from "./flashcardSet";
import flashcardReducer from "./flashcard";
import userReducer from "./user";

const rootReducer = combineReducers({
  session: sessionReducer,
  sets: flashcardSetReducer,
  flashcards: flashcardReducer,
  users: userReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
