
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZyF-iFTDgFk0ynR-gy9DzBFKDK4EnUlM",
  authDomain: "fair-voice.firebaseapp.com",
  projectId: "fair-voice",
  storageBucket: "fair-voice.firebasestorage.app",
  messagingSenderId: "233429518067",
  appId: "1:233429518067:web:91bd33ad0af47a5bcdd986",
  measurementId: "G-2VGY2PX385"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
