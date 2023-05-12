import './style.css'
import { getTasks, addTask } from './src/firebase-config.js'

let tasks = [];

const todoContainer = document.querySelector('#to-do-container');
const buttonTask = document.querySelector('#new-task-button');
buttonTask.addEventListener('click', async ()=> await handleClick());

await renderTask();

async function renderTask(){

  todoContainer.innerHTML = '';

  tasks =  await getTasks();
  tasks.forEach(task => {
    console.log(task);
    const element = document.createElement('li');
    element.textContent = task.title;
    todoContainer.append(element);
  });

}

async function handleClick(){
  const inputTask = document.querySelector('#to-do-input');
  const inputText = inputTask.value;

  await addTask(inputText);

  inputTask.value = '';

  await renderTask();
}



