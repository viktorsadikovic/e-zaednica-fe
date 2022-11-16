import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCkPcSgJDNTgPd-nPgw9YiRiZ37RmV7DUI",
  authDomain: "e-zaednica.firebaseapp.com",
  projectId: "e-zaednica",
  storageBucket: "e-zaednica.appspot.com",
  messagingSenderId: "474856198878",
  appId: "1:474856198878:web:3d6a6a4837801b2bdfa84f",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
