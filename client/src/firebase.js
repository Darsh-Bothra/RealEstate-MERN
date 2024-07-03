// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-mern-e649c.firebaseapp.com",
  projectId: "realestate-mern-e649c",
  storageBucket: "realestate-mern-e649c.appspot.com",
  messagingSenderId: "344616568682",
  appId: "1:344616568682:web:d309892f8bcd5eacc4c713"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);