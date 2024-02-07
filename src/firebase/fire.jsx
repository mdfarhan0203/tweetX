// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA6Pelm-75YiTUP1QjHMlNBPtPX2FHNZSk",
  authDomain: "tweetx-96b6c.firebaseapp.com",
  databaseURL: "https://tweetx-96b6c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tweetx-96b6c",
  storageBucket: "tweetx-96b6c.appspot.com",
  messagingSenderId: "900045304235",
  appId: "1:900045304235:web:83c314af2b55423884e2ee",
  measurementId: "G-KJDCKMHCMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export  {auth,db}
