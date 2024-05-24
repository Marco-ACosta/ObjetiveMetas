import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYEujcI9Xtvhc80Btxe6I-E7DPIcNwvyI",
    authDomain: "avaliacaodevsis.firebaseapp.com",
    databaseURL: "https://avaliacaodevsis-default-rtdb.firebaseio.com",
    projectId: "avaliacaodevsis",
    storageBucket: "avaliacaodevsis.appspot.com",
    messagingSenderId: "360624263341",
    appId: "1:360624263341:web:45b3db402c294cee7a7624"
  };

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { db, app, firebase_app };