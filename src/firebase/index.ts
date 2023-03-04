import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {collection, getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcc5AnFG9TclvWOS540ERf4DkkpZop5MY",
    authDomain: "syliusroulette.firebaseapp.com",
    projectId: "syliusroulette",
    storageBucket: "syliusroulette.appspot.com",
    messagingSenderId: "863281064362",
    appId: "1:863281064362:web:f648425553fbac221023d3",
    measurementId: "G-H0Y98C8FJE"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAcc5AnFG9TclvWOS540ERf4DkkpZop5MY",
//     authDomain: "syliusroulette.firebaseapp.com",
//     projectId: "syliusroulette",
//     storageBucket: "syliusroulette.appspot.com",
//     messagingSenderId: "863281064362",
//     appId: "1:863281064362:web:f648425553fbac221023d3",
//     measurementId: "G-H0Y98C8FJE"
// };

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const devsRef = collection(db, 'devs');
export {
    db, auth, devsRef
}
