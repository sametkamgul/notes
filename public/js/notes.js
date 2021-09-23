console.log('app is started...');
const inputNote = document.querySelector('.input-note');
const taskList = document.querySelector('.task-list');
const addTaskButton = document
    .querySelector('.btn-add-task')
    .addEventListener('click', addTask);        // add task button on html

    
// task status enum
const TaskStatus = {
    done: 'DONE',
    todo: 'TODO'
};
    
readFromLocalStorage();     //reading elements from local storage

// adds task
function addTask(e) {
    if (/^ *$/.test(inputNote.value)) {         // regex check for null or only-space-char strings
        alert('Please enter a value');
    } else {
        if(isTaskExisted(inputNote.value) === true) {
            alert('Task is already added!');        // dont save the task. it is already added
        } else {
            var task = {task:inputNote.value, status:TaskStatus.todo};      // creating new task in right form
            initializeTask(task);        // initialization a new task
            saveToLocalStorage(task);        // saving task to the local storage
        }
        inputNote.value = '';       // clear input field
    }
}

// update task status
function updateTask(e) {
    var tasks = getArrayFromStorage();
    console.log('task', e);
    tasks.filter(taskElement => {       // TODO: refactor here with find() method instead of filter
        if(taskElement.task === e) {
            console.log('found', taskElement);
            if (taskElement.status === TaskStatus.todo) {
                taskElement.status = TaskStatus.done;       // toggle the task status
            } else if (taskElement.status === TaskStatus.done ){
                taskElement.status = TaskStatus.todo;       // toggle the task status
                console.log("updated");
            }
        }
    });
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//common function for item button events
function buttonAction(e) {
    if (e.target.classList.contains('task-btn-done')) {
        this.parentElement.classList.toggle('task-done');
        var taskToBeUpdated = this.parentElement.querySelector('.task-definition').textContent;
        updateTask(taskToBeUpdated);
    } else if (e.target.classList.contains('task-btn-delete')) {
        e.target.parentElement.classList.toggle('deleting-now')     // adding dissappearing effect
        e.target.parentElement.addEventListener('transitionend', function () {      // transitionend event is used for triggering remove method down below in the callback function
            let taskToBeDeleted = this.querySelector('.task-definition').textContent;
            deleteFromLocalStorage(taskToBeDeleted);
            this.remove();
        });
    }
}

// saves tasks to the local storage. user can see after the closing/opening browser
function saveToLocalStorage(newTask) {
    let tasks = getArrayFromStorage();      // get data from storage
    const task = {task:newTask.task, status:newTask.status};
    tasks.push(task);
    console.log('saving', task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// deletes tasks from local storage
function deleteFromLocalStorage(taskToBeDeleted) {
    //TODO: behavioral implementation
    let tasks = getArrayFromStorage();
    tasks.filter(currentTask => {
        if (currentTask.task === taskToBeDeleted) {
            tasks.splice(tasks.indexOf(currentTask), 1);        // remove element from array by index
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
    taskDefiniton.textContent = taskToBeIntialized.task;
    if (taskToBeIntialized.status == TaskStatus.done) {
        taskItem.classList.add('task-done');
    }
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
    tasks.forEach(function (taskElement) {
        initializeTask(taskElement);        
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
// TODO: add a done flag to the JSON data in the local storage for done-tasks
// TODO: move app to the aws elastic beanstalk free tier service(AWS EBS)