import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7XbuYcoj3oIV-V2ApNGdThTXA4jhPCp0",
  authDomain: "nwittertype.firebaseapp.com",
  projectId: "nwittertype",
  storageBucket: "nwittertype.appspot.com",
  messagingSenderId: "940533308611",
  appId: "1:940533308611:web:84e0511e33f22500615676",
};

export default firebase.initializeApp(firebaseConfig);
