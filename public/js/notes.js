console.log('app is started...');
const inputNote = document.querySelector('.input-note');
const taskList = document.querySelector('.task-list');

readFromLocalStorage();     //reading elements from local storage

// add task button on html
const addTaskButton = document
    .querySelector('.btn-add-task')
    .addEventListener('click', addTask);

// adds task
function addTask(e) {
    if (/^ *$/.test(inputNote.value)) {     // regex check for null or only-space-char strings
        alert('Please enter a value');
    } else {
        if(isTaskExisted(inputNote.value) === true) {
            alert('Task is already added!');        // dont save the task. it is already added
        } else {
            initializeTask(inputNote.value);        // initialization a new task
            saveToLocalStorage(inputNote.value);        // saving task to the local storage
        }
        inputNote.value = '';       // clear input field
    }
}

//common function for item button events
function buttonAction(e) {
    // console.log(e.target);
    if (e.target.classList.contains('task-btn-done')) {
        this.classList.toggle('task-done');
    } else if (e.target.classList.contains('task-btn-delete')) {
        e.target.parentElement.classList.toggle('deleting-now')     // adding dissappearing effect
        e.target.parentElement.addEventListener('transitionend', function () {      // transitionend event is used for triggering remove method down below in the callback function
            this.remove(); 
        });
    }
}

// saves tasks to the local storage. user can see after the closing/opening browser
function saveToLocalStorage(newTask) {
    let tasks = getArrayFromStorage();      // get data from storage
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// deletes tasks from local storage
function deleteFromLocalStorage(taskToBeDeleted) {
    //TODO: behavioral implementation

}

// inits a task. DOM operations are handled here
function initializeTask(taskToBeIntialized) {
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

    
    taskDefiniton.className = 'task-definition';        // defining task-definition
    taskItem.className = 'task-item';       // defining task-item

    // adding li element to parent div element
    taskDefiniton.textContent = taskToBeIntialized;
    taskItem.appendChild(taskDefiniton);

    taskItem.appendChild(taskBtnDone);      // adding done button to parent div element    
    taskItem.appendChild(taskBtnDelete);        // adding delete button to parent div element
    taskList.appendChild(taskItem);
    taskBtnDone.addEventListener('click', buttonAction);
    taskBtnDelete.addEventListener('click', buttonAction);
}

// reads from local storage and showing tasks in the UI
function readFromLocalStorage() {
    let tasks = getArrayFromStorage();      // get data from storage
    tasks.forEach(function (task) {
        initializeTask(task);        
    });
}

// checks the task is present in the local storage or not.
function isTaskExisted(taskToBeChecked) {
    let counter = 0;
    console.log("test_start");
    let tasks = getArrayFromStorage();      // get data from storage
    tasks.filter(currentTask => {
        if (currentTask === taskToBeChecked) {
            counter++;
        }
    });
    return counter > 0;
}

// reads the local storage data and returns it
function getArrayFromStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// TODO: bug fix for first run: the app refresh the screen