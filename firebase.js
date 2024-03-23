// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_MESSAGE_ID ,
//   appId: import.meta.env.VITE_APPID,
//   measurementId: "G-8TMNMPZX2E"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD50arVMZctPH_8hphc0HN7U5Rh6fmKzKc",
  authDomain: "mernauth-16c63.firebaseapp.com",
  projectId: "mernauth-16c63",
  storageBucket: "mernauth-16c63.appspot.com",
  messagingSenderId: "243892888216",
  appId: "1:243892888216:web:0136190b2dd503bcda26ed",
  measurementId: "G-8TMNMPZX2E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
