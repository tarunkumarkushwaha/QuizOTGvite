import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "quizotg-tarun.firebaseapp.com",
    projectId: "quizotg-tarun",
    storageBucket: "quizotg-tarun.appspot.com",
    messagingSenderId: "692133132591",
    appId: import.meta.env.VITE_APP_ID,
    measurementId: "G-0XNKZT4FP2",
    databaseURL: "https://quizotg-tarun-default-rtdb.firebaseio.com/",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
const db = getFirestore(app);

export const logOut = () => {
    return signOut(auth);
  };

setPersistence(auth, browserSessionPersistence)
  .then(() => {

    // return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
