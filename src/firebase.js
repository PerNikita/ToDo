// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQNfbtLI67EYObXqw1jMFVlMxpUzIO3xA",
  authDomain: "todo-8f7b0.firebaseapp.com",
  projectId: "todo-8f7b0",
  storageBucket: "todo-8f7b0.appspot.com",
  messagingSenderId: "303291509232",
  appId: "1:303291509232:web:f552e2dac2524bc47a5535"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDataToFirestore(params) {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: "Задача 3",
          status: "active"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

addDataToFirestore();