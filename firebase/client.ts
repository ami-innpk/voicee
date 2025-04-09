
import { initializeApp,getApps,getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1BnySW9O3XNf80EGnGz1kFdTy5lNVPr4",
  authDomain: "voicee-bdcde.firebaseapp.com",
  projectId: "voicee-bdcde",
  storageBucket: "voicee-bdcde.firebasestorage.app",
  messagingSenderId: "472247602608",
  appId: "1:472247602608:web:9e5079db590746ec621a75",
  measurementId: "G-TTQZW1RLQ4"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
