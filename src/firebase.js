import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3VXxK1PT7zr7p23eDkHRxL6XEugSqH_s",
  authDomain: "habitrack-c3b04.firebaseapp.com",
  projectId: "habitrack-c3b04",
  storageBucket: "habitrack-c3b04.appspot.com", // ⚠️ esta línea es importante
  messagingSenderId: "659345535575",
  appId: "1:659345535575:web:3121bc0ffcf6d477042912"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
