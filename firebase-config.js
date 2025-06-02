// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZEeCoAzyX7fEdAmCgA_zret6fv05btqE",
    authDomain: "loginpage-e64dc.firebaseapp.com",
    projectId: "loginpage-e64dc",
    storageBucket: "loginpage-e64dc.firebasestorage.app",
    messagingSenderId: "598540866506",
    appId: "1:598540866506:web:0ab8f4dfdd8b75f7ea7533"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 
