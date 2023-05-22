// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

 const firebaseConfig= {
    apiKey: "AIzaSyAUdMifmp17JFdeYvJNr81Ln2Bi3apjIKE",
    authDomain: "dodologin-de084.firebaseapp.com",
    projectId: "dodologin-de084",
    storageBucket: "dodologin-de084.appspot.com",
    messagingSenderId: "676590743157",
    appId: "1:676590743157:web:099bb26fd054278fea523c",
    measurementId: "G-PNNR2BB5S0"
  }

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

