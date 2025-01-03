import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7NSjdV4Y_4xesQqxO6MmuBCvIg49sl-Y",
  authDomain: "solana-watch.firebaseapp.com",
  projectId: "solana-watch",
  storageBucket: "solana-watch.appspot.com",
  messagingSenderId: "232166190725",
  appId: "1:232166190725:web:cd79e188d41f4f14fb43ec",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
