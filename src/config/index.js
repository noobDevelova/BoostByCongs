// FIREBASE KEY IMPORTED FROM .env
import {
  FIREBASE_API_KEY, // Firebase API key
  FIREBASE_AUTH_DOMAIN, // Firebase authentication domain
  FIREBASE_PROJECT_ID, // Firebase project ID
  FIREBASE_STORAGE_BUCKET, // Firebase storage bucket
  FIREBASE_MESSAGING_SENDER_ID, // Firebase messaging sender ID
  FIREBASE_APP_ID, // Firebase app ID
} from "@env";

import {
  initializeApp, // Firebase initializeApp function
} from "firebase/app";
import {
  getReactNativePersistence, // Firebase getReactNativePersistence function
  initializeAuth, // Firebase initializeAuth function
} from "firebase/auth";
import {
  collection, // Firebase collection function
  getFirestore, // Firebase getFirestore function
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY, // Firebase API key
  authDomain: FIREBASE_AUTH_DOMAIN, // Firebase authentication domain
  projectId: FIREBASE_PROJECT_ID, // Firebase project ID
  storageBucket: FIREBASE_STORAGE_BUCKET, // Firebase storage bucket
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID, // Firebase messaging sender ID
  appId: FIREBASE_APP_ID, // Firebase app ID
};

// Initialize Firebase app
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase authentication
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage), // Configure persistence with AsyncStorage
});

// Get Firebase Firestore instance
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Firebase collection for user details
export const FIREBASE_COLLECTION_USER_DETAIL = collection(
  FIREBASE_DB,
  "user_detail"
);

// Firebase collection for heroes
export const FIREBASE_COLLECTION_HEROES = collection(FIREBASE_DB, "heroes");

// Firebase collection for rank catalog
export const FIREBASE_COLLECTION_RANK_CATALOG = collection(
  FIREBASE_DB,
  "katalog_rank"
);

// Firebase collection for order data
export const FIREBASE_COLLECTION_ORDERS = collection(FIREBASE_DB, "orders");
