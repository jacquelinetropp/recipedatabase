import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import {
  getFirebase,
} from "react-redux-firebase";
import {
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import firebase from 'firebase/app';
import {config} from '../firebase/firebase';
import { persistStore } from "redux-persist";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, config)
  )
);

export const persistor = persistStore(store);

export default store;