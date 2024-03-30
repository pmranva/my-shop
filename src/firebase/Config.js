import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC380ShQnmpm3tpo8x9ymULJrKkOIYWudw",
  authDomain: "my-shop-c7ed7.firebaseapp.com",
  projectId: "my-shop-c7ed7",
  storageBucket: "my-shop-c7ed7.appspot.com",
  messagingSenderId: "862271413208",
  appId: "1:862271413208:web:b3a2e8878ff599d438b0ad",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDatabase = getDatabase(app);



export default app;
