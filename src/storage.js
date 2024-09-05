// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
        collection,
        addDoc,
        getDocs,
        writeBatch,
        doc,
        serverTimestamp,
        query,
        orderBy
    } from "firebase/firestore"; 

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

export function createStorage(key) {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return {
        key,
        db,
        pull: async function() {

            const ref = collection(this.db, this.key);
            const q = query(ref, orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(q);
            const todos = [];

            querySnapshot.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    title: doc.data().title
                })
            });
                return todos;
        },
        push: async function(todo) {

            try {
                const docRef = await addDoc(collection(this.db, this.key), {
                  title: todo.title,
                  status: todo.status,
                  createdAt: serverTimestamp()
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        },
        delete: async function (todos) {

            const batch = writeBatch(this.db);

            todos.forEach((todo) => {
                const ref = doc(this.db, this.key, todo.id);
                batch.delete(ref);
            });
            await batch.commit();
        }
    }
}