
import { initializeApp,getApps,getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD1BnySW9O3XNf80EGnGz1kFdTy5lNVPr4",
//   authDomain: "voicee-bdcde.firebaseapp.com",
//   projectId: "voicee-bdcde",
//   storageBucket: "voicee-bdcde.firebasestorage.app",
//   messagingSenderId: "472247602608",
//   appId: "1:472247602608:web:9e5079db590746ec621a75",
//   measurementId: "G-TTQZW1RLQ4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA30pSOT2Or5GfJOhyQYB8GU0VG6Kz3zcU",
  authDomain: "voicee-95850.firebaseapp.com",
  projectId: "voicee-95850",
  storageBucket: "voicee-95850.firebasestorage.app",
  messagingSenderId: "131423799025",
  appId: "1:131423799025:web:6b68d67bc5d6f68e6f4b50",
  measurementId: "G-FCJHETYNTZ"
};


// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
