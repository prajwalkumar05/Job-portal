// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { getStorage } from "firebase/storage";
import {
 
  signInWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBT8R3vYUuBaWh6wkWSUTSKVLYXIAxmXx0",
  authDomain: "dairy-management-db897.firebaseapp.com",
  databaseURL: "https://dairy-management-db897-default-rtdb.firebaseio.com",
  projectId: "dairy-management-db897",
  storageBucket: "dairy-management-db897.appspot.com",
  messagingSenderId: "586064061033",
  appId: "1:586064061033:web:c71a64c4895d0190dab8f8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

export const useAuthListener = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        setCurrentUser(user);
      } else {
        localStorage.removeItem("authUser");
        setCurrentUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return { currentUser };
};

export const Login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
