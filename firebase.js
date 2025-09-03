// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgl3O_5dBMvB79kjHTWey3e9xNlF_tDIA",
  authDomain: "digitalhr-2c4c4.firebaseapp.com",
  projectId: "digitalhr-2c4c4",
  storageBucket: "digitalhr-2c4c4.firebasestorage.app",
  messagingSenderId: "513390614700",
  appId: "1:513390614700:web:d7b11bcfeb2a06f81b2709",
  measurementId: "G-9RBTNL57WL"
};

const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { app,db,auth ,storage};
