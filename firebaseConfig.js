// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore,collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlcbCGV1F-kqHnoEznkkkwkiDUwf7CeOI",
  authDomain: "auramart-f0848.firebaseapp.com",
  projectId: "auramart-f0848",
  storageBucket: "auramart-f0848.firebasestorage.app",
  messagingSenderId: "12418232082",
  appId: "1:12418232082:web:c6a0af25ed26a8baca0dcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app,
  {persistence: getReactNativePersistence(AsyncStorage)}
);

export const db = getFirestore(app);

export const usersRef = collection(db, "users");