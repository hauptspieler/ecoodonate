import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGUbdlG6fvhcQtdUYguXZBF-dc9mN2Qhw",
  authDomain: "fiapp-33b5c.firebaseapp.com",
  projectId: "fiapp-33b5c",
  storageBucket: "fiapp-33b5c.appspot.com",
  messagingSenderId: "620386557451",
  appId: "1:620386557451:web:116e9ad14dda44f20a310e",
  measurementId: "G-NL42NDPT9H"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
