// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
        collection,
        getDocs,
        writeBatch,
        doc,
        serverTimestamp,
        query,
        orderBy,
        setDoc,
        updateDoc
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
            const q = query(ref, orderBy('createdAt'));

            const querySnapshot = await getDocs(q);
            const todos = [];

            querySnapshot.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    title: doc.data().title,
                    done: doc.data().done
                })
            });
                return todos;
        },
        push: async function(todo) {

            try {
                await setDoc(doc(this.db, this.key, todo.id), {
                  title: todo.title,
                  done: todo.done,
                  createdAt: serverTimestamp()
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        },
        delete: async function ({ todosIds }) {

            const batch = writeBatch(this.db);

            todosIds.forEach((id) => {
                const ref = doc(this.db, this.key, id);
                batch.delete(ref);
            });
            await batch.commit();
        },
        update: async function(todo) {
            const ref = doc(db, this.key, todo.id);
            await updateDoc(ref, {
                done: todo.done
            });
        }
    }
}