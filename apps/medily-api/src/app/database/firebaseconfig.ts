// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCswiM_xi4ptEbqLkw4yyIeqFGAkwzPANw",
  authDomain: "medily-auth.firebaseapp.com",
  databaseURL: "https://medily-auth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medily-auth",
  storageBucket: "medily-auth.appspot.com",
  messagingSenderId: "1006671217964",
  appId: "1:1006671217964:web:85aeed37ee50886ca4d889",
  measurementId: "G-HEHLBFVN8T"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);