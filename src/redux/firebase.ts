import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSsBzIIWUcPZRQIGbWkMIEULGj4DRQkYs",
  authDomain: "quiz-builder-b2a28.firebaseapp.com",
  projectId: "quiz-builder-b2a28",
  storageBucket: "quiz-builder-b2a28.appspot.com",
  messagingSenderId: "785670382739",
  appId: "1:785670382739:web:fab2f62f00c60c1ba29966",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
