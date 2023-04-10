// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwvpHwCklQRReHJcPY0-fsc2c5tomA43Y",
  authDomain: "parking-slot-app-799a9.firebaseapp.com",
  projectId: "parking-slot-app-799a9",
  storageBucket: "parking-slot-app-799a9.appspot.com",
  messagingSenderId: "818629227602",
  appId: "1:818629227602:web:3b026b36cd6116058ddb8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
