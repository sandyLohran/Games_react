
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvf5P3MHbJCItV5OuWfORQoTObcjAzhtg",
  authDomain: "games-dbc4c.firebaseapp.com",
  projectId: "games-dbc4c",
  storageBucket: "games-dbc4c.appspot.com",
  messagingSenderId: "19634992989",
  appId: "1:19634992989:web:7eb638647e9190e344dab4",
  measurementId: "G-BDMVE074MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



export { app, analytics, auth }; 