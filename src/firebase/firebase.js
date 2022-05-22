import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";
import 'firebase/storage';


export const config = {
    apiKey: "AIzaSyBDe5sF38pTu-WfItxMoAUpzKrD4gcncGA",
    authDomain: "recipe-database-8e052.firebaseapp.com",
    projectId: "recipe-database-8e052",
    storageBucket: "recipe-database-8e052.appspot.com",
    messagingSenderId: "210878959120",
    appId: "1:210878959120:web:f7e2ad3c5e00c76bedc495",
    measurementId: "G-5T2JHBLVB0"
};

firebase.initializeApp(config);
firebase.firestore();
export const storage = firebase.storage();
export default firebase;