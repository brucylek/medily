import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCswiM_xi4ptEbqLkw4yyIeqFGAkwzPANw",
  authDomain: "medily-auth.firebaseapp.com",
  projectId: "medily-auth",
  storageBucket: "medily-auth.appspot.com",
  messagingSenderId: "1006671217964",
  appId: "1:1006671217964:web:85aeed37ee50886ca4d889",
  measurementId: "G-HEHLBFVN8T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;