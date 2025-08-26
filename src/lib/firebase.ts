import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7Ms9W0VVdPrHTCdFs3mpcWCdeTtYXtcg",
  authDomain: "petshop-manage.firebaseapp.com",
  projectId: "petshop-manage",
  storageBucket: "petshop-manage.firebasestorage.app",
  messagingSenderId: "62849885728",
  appId: "1:62849885728:web:7d2f051f92e750d2ed3e45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
