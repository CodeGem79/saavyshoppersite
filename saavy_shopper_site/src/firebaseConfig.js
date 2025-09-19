import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, where, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // NEW: Imports for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJVWtQ1uVYhlt1EJ05e-jISdNC2ukqzzc",
  authDomain: "saavy-shopper-app.firebaseapp.com",
  projectId: "saavy-shopper-app",
  storageBucket: "saavy-shopper-app.firebasestorage.app",
  messagingSenderId: "135103147755",
  appId: "1:135103147755:web:88ce1bd409a656b8e058ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // NEW: Initialize Firebase Storage

// Export the database instance, storage, and other functions
export { db, collection, getDocs, addDoc, serverTimestamp, query, where, updateDoc, doc, deleteDoc, getDoc, storage, ref, uploadBytes, getDownloadURL };