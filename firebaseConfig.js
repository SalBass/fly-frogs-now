import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAWHC6xO_V4-rUCCqNWrgzlMYfjdDqAcY",
  authDomain: "fly-frogs-tadpoles-934c7.firebaseapp.com",
  projectId: "fly-frogs-tadpoles-934c7",
  storageBucket: "fly-frogs-tadpoles-934c7.appspot.com",
  messagingSenderId: "882139883508",
  appId: "1:882139883508:web:84382d09f7d0092bc47ba1"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);