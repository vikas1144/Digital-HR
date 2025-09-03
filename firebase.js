// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxx",
  projectId: "xxxxxxxxx",
  storageBucket: "xxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxx",
  appId: "xxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { app,db,auth ,storage};

