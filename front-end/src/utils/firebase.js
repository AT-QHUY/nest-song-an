// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTUgzauRi4TUY0psvI-bJFXIYVZyV9lIQ",
  authDomain: "nest-song-an-5650c.firebaseapp.com",
  projectId: "nest-song-an-5650c",
  storageBucket: "nest-song-an-5650c.appspot.com",
  messagingSenderId: "845763682921",
  appId: "1:845763682921:web:3d857e45c78fc2034df8f8",
  measurementId: "G-Q5YQKPNT3B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage  = getStorage();