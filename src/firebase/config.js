import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtHX0-SRX_ol_mPiU17ZpoPhgw-oZxQsI",
  authDomain: "todo-react-7b7c0.firebaseapp.com",
  projectId: "todo-react-7b7c0",
  storageBucket: "todo-react-7b7c0.appspot.com",
  messagingSenderId: "373940917575",
  appId: "1:373940917575:web:1e813e9561c8cfe2a76862",
  measurementId: "G-MVD43TTW3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const database = getFirestore(app)

export {auth,provider,database}