import { logInUser } from '../firebase-config.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const inputElements = document.querySelector('#sign-in-form').querySelectorAll('input')
console.log(inputElements)
const formButton = document.getElementById('log-button')
formButton.addEventListener('click', (e)=> signIn(e))

const auth = getAuth();

  function signIn(e) {
    e.preventDefault()

    const userInfo = {}

    inputElements.forEach((elem)=>{
        if(elem.files && elem.files[0]){
            userInfo[elem.name] = elem.files[0]
        } else if(elem.value && elem.value.length > 0){
            userInfo[elem.name] = elem.value
        } /*else {
            alert('No todos los valores estan diligenciados')
        }*/
    })
    console.log(userInfo)
    logInUser(userInfo)
    }