import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {



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


export async function logInUser(userInfo) {

    try {
        console.log(userInfo);
        const userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });

    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}

export async function createUser(userInfo) {

    try {
        console.log(userInfo);
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        // Signed in
        const user = userCredential.user;

        // crear usuario en DB

        const dbInfo = {
            email: userInfo.email,
            name: userInfo.name,
            pass: userInfo.pass
        }

        await addUserToDb(dbInfo, user.uid)
        console.log(4)
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}