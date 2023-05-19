import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
 //nada por aqui, nada por alla

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getTasks() {

    const tasks = [];

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
    });

    return tasks;

}

export async function obtainTasks() {

    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks
}

export async function addTask(taskTitle) {

    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: taskTitle,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}