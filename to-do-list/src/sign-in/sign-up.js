import { createUser } from '../firebase-config.js';

const inputElements = document.querySelector('#user-info').querySelectorAll('input');

const formButton = document.querySelector('#form-button');
formButton.addEventListener('click', (e) => {
    signUp(e);
});

function signUp(e) {
    
    e.preventDefault();
    let userInfo = {}
    inputElements.forEach(element => {
        if(element.files[0] && element.files){
            userInfo[element.name] = element.files[0]
        } else if (element.value && element.value.length > 0){
            userInfo[element.name] = element.value;
        } else {
            alert("Please fill all the items")
        }
    });
    console.log(userInfo);
    createUser(userInfo);
}