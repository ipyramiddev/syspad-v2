// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfFgvDNq35uEpfXSs-Qgd9OMu2hkoYJEA",
  authDomain: "syspad-project.firebaseapp.com",
  projectId: "syspad-project",
  storageBucket: "syspad-project.appspot.com",
  messagingSenderId: "16669624597",
  appId: "1:16669624597:web:c919f65f90006e2235c11c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app)