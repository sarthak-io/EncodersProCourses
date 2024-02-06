// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAcLskYy1sOU_M7nmBqHWMaj20rTLvqkmk",
    authDomain: "encoderspro-course.firebaseapp.com",
    databaseURL: "https://encoderspro-course-default-rtdb.firebaseio.com",
    projectId: "encoderspro-course",
    storageBucket: "encoderspro-course.appspot.com",
    messagingSenderId: "741409496176",
    appId: "1:741409496176:web:4ca191d29530f0829468b5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);