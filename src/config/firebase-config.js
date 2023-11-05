// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh2kQ80kZuUu65mkK-SK4stEhlgmiwWaI",
  authDomain: "vehicle-expense-manager-7495c.firebaseapp.com",
  projectId: "vehicle-expense-manager-7495c",
  storageBucket: "vehicle-expense-manager-7495c.appspot.com",
  messagingSenderId: "94620476054",
  appId: "1:94620476054:web:4eeddb3eb76392b5fe18b7",
  measurementId: "G-RP98W5FC4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy