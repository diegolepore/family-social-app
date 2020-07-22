import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
  
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFtYO7jESqGmfxKpQ8W5WKlgvn6mEq1DA",
  authDomain: "family-social-network-app.firebaseapp.com",
  databaseURL: "https://family-social-network-app.firebaseio.com",
  projectId: "family-social-network-app",
  storageBucket: "family-social-network-app.appspot.com",
  messagingSenderId: "606210798646",
  appId: "1:606210798646:web:b05a6b80905cef008b9497"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {firebase, db, auth, storage }