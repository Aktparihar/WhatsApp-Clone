import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDK1c3GO3cmydKgUJnfhQ-dYcs-6CnqFdk",
    authDomain: "whatsapp-clone-38b76.firebaseapp.com",
    projectId: "whatsapp-clone-38b76",
    storageBucket: "whatsapp-clone-38b76.appspot.com",
    messagingSenderId: "804450482272",
    appId: "1:804450482272:web:b0b1c3e2489f705303eb05"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider };
export default db;