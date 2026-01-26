// Firebase initialization and exports (modular SDK)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Optionally replace with environment variables in production.
const firebaseConfig = {
  apiKey: "AIzaSyDEIjijDZPZ-PUd4DUEXF4ZJKb_UYrkgyQ",
  authDomain: "bastyasaka-alumni.firebaseapp.com",
  projectId: "bastyasaka-alumni",
  storageBucket: "bastyasaka-alumni.firebasestorage.app",
  messagingSenderId: "680419545847",
  appId: "1:680419545847:web:7a9d69f6e0d347cdfd39f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;