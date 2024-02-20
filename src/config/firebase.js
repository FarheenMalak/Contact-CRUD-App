// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClk2MFuGVSrGtUpDcDCyPdgIuCK_7bci4",
  authDomain: "contact-crud-app-vite.firebaseapp.com",
  projectId: "contact-crud-app-vite",
  storageBucket: "contact-crud-app-vite.appspot.com",
  messagingSenderId: "120488886871",
  appId: "1:120488886871:web:0b69aafc5bc8949341d912"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);