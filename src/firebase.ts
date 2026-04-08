import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBace9BxubATIJ2xEVgbi2LjVZLHpVUd1k",
  authDomain: "mangadiary-42218.firebaseapp.com",
  projectId: "mangadiary-42218",
  storageBucket: "mangadiary-42218.firebasestorage.app",
  messagingSenderId: "399243492121",
  appId: "1:399243492121:web:1e8b189277ded3f55ee388"
};

const app = initializeApp(firebaseConfig);

export const dbFirestore = getFirestore(app);
