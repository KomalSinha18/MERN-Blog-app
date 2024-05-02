// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-6596f.firebaseapp.com",
  projectId: "mern-blog-app-6596f",
  storageBucket: "mern-blog-app-6596f.appspot.com",
  messagingSenderId: "773588625500",
  appId: "1:773588625500:web:ff4211b2e89e4a6e5c1e99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);