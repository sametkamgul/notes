console.log('hello world!!!');

const inputNote = document.querySelector('.input-note');
const taskList = document.querySelector('.task-list');

const addTaskButton = document
    .querySelector('.btn-add-task')
    .addEventListener('click', addTask);

function addTask(e) {
    if (/^ *$/.test(inputNote.value)) {     // regex check for null or only-space-char strings
        alert('Please enter a value');
    } else {
        const taskBtnDone = document.createElement('button');
        const taskBtnDelete = document.createElement('button');
        const taskItem = document.createElement('div');
        const taskDefiniton = document.createElement('li');

        // defining buttons
        taskBtnDone.classList.add('task-btn', 'task-btn-done');
        taskBtnDelete.classList.add('task-btn', 'task-btn-delete');

        // adding i element to parent button element, for done and delete button
        taskBtnDone.innerHTML = "<i class='fas fa-check-square'></i>";
        taskBtnDelete.innerHTML = "<i class='fas fa-trash-alt'></i>";

        // defining task-definition
        taskDefiniton.className = 'task-definition';

        // defining task-item
        taskItem.className = 'task-item';

        // adding li element to parent div element
        taskDefiniton.textContent = inputNote.value;
        taskItem.appendChild(taskDefiniton);

        // adding done button to parent div element
        taskItem.appendChild(taskBtnDone);

        // adding delete button to parent div element
        taskItem.appendChild(taskBtnDelete);

        taskList.appendChild(taskItem);

        // saving item to the local storage
        saveToLocalStorage(inputNote.value);

        // clear input field
        inputNote.value = '';

        taskBtnDone.addEventListener('click', buttonAction);
        taskBtnDelete.addEventListener('click', buttonAction);

        // common function for item button events
        function buttonAction(e) {
            console.log(e.target);
            if (e.target.classList.contains('task-btn-done')) {
                taskItem.classList.toggle('task-done');
            } else if (e.target.classList.contains('task-btn-delete')) {
                e.target.parentElement.classList.toggle('deleting-now') // adding dissappearing effect
                
                // transitionend event is used for triggering remove method down below in the callback function
                e.target.parentElement.addEventListener('transitionend', function () {
                    taskItem.remove(); 
                });
            }
        }
    }
}

function saveToLocalStorage(newTask) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(newTask);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}