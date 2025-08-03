// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTr8CSibenRMD90-uOLTohrYrVqSjSZzs",
  authDomain: "mini-linkedin-a9911.firebaseapp.com",
  projectId: "mini-linkedin-a9911",
  storageBucket: "mini-linkedin-a9911.firebasestorage.app",
  messagingSenderId: "20709906688",
  appId: "1:20709906688:web:c09f816cc4fc4b99ecfbe5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export them for use in other parts of the app
export { auth, db };