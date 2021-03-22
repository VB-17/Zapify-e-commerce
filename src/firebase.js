import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "e-commerce-store-37b6c",
  storageBucket: "e-commerce-store-37b6c.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER,
  appId: process.env.APP_ID,
  measurementId: "G-PTYZ6ND9BV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;
