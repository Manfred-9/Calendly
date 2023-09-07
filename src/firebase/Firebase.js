import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB2TDKKTpQwwIsNoNhRORB3PH90pijQPRs",
  authDomain: "test-ea257.firebaseapp.com",
  projectId: "test-ea257",
  storageBucket: "test-ea257.appspot.com",
  messagingSenderId: "49486999807",
  appId: "1:49486999807:web:becef4994206d2eeed5cca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export const auth = getAuth(app);