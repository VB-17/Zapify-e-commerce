import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBom4zDke9mYimbaK5pacCXKwvITxGkluQ",
  authDomain: "e-commerce-store-37b6c.firebaseapp.com",
  projectId: "e-commerce-store-37b6c",
  storageBucket: "e-commerce-store-37b6c.appspot.com",
  messagingSenderId: "726421179450",
  appId: "1:726421179450:web:52f4f76b9bf4c11104f903",
  measurementId: "G-PTYZ6ND9BV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;
