// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8jUwPaAZtL2cGVB3RHvLa4Y4oq9vofCM",
  authDomain: "eshop-5e629.firebaseapp.com",
  projectId: "eshop-5e629",
  storageBucket: "eshop-5e629.appspot.com",
  messagingSenderId: "538009009028",
  appId: "1:538009009028:web:cf5396ea4baf75e637fbd1",
  measurementId: "G-13B9CJNJ2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 
export const storage = getStorage(app)
export default app