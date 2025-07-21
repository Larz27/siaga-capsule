// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwEdRVeDeMqnXeeq5jKfJPquQj2w7wVK8",
  authDomain: "siaga-capsule.firebaseapp.com",
  projectId: "siaga-capsule",
  storageBucket: "siaga-capsule.firebasestorage.app",
  messagingSenderId: "418876250788",
  appId: "1:418876250788:web:4e9dd18713f0b1fe65e431"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
