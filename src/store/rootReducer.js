import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import userReducer from "./user/userReducer";
import recipeReducer from "./recipes/recipeReducer";

export default combineReducers({
    user: userReducer,
    recipe: recipeReducer,
    firebase: firebaseReducer,
    firesore: firestoreReducer
})
