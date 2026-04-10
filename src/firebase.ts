import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mangadiary-42218.firebaseapp.com",
  databaseURL: "https://mangadiary-42218-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mangadiary-42218",
  storageBucket: "mangadiary-42218.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const dbRealtime = getDatabase(app);
