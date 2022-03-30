// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXjUjwFUWSXLMcrz1LXYzUWJiyImIgGBg",
  authDomain: "carshop-51620.firebaseapp.com",
  projectId: "carshop-51620",
  storageBucket: "carshop-51620.appspot.com",
  messagingSenderId: "249523818868",
  appId: "1:249523818868:web:950543afa2638327fb9c21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;