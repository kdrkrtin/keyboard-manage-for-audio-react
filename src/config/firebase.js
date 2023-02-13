// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "hm-sahne---ses---react.firebaseapp.com",
  databaseURL: "https://hm-sahne---ses---react-default-rtdb.firebaseio.com",
  projectId: "hm-sahne---ses---react",
  storageBucket: "hm-sahne---ses---react.appspot.com",
  messagingSenderId: "199036469822",
  appId: "1:199036469822:web:a322d44a40b60f9154876f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;