console.log("hello world!!!");

const inputNote = document.querySelector(".input-note");
const taskList = document.querySelector(".task-list");

const addTaskButton = document
    .querySelector(".btn-add-task")
    .addEventListener("click", function (e) {
        console.log("clicked to the button");
        if (inputNote.value === "") {
            alert("Please enter a value");
        } else {
            const taskBtnDone = document.createElement("button");
            const taskBtnDelete = document.createElement("button");
            const taskItem = document.createElement("div");
            const taskDefiniton = document.createElement("li");

            // defining buttons
            taskBtnDone.classList.add("task-btn", "task-btn-done");
            taskBtnDelete.classList.add("task-btn", "task-btn-delete");

            // adding i element to parent button element, for done and delete button
            taskBtnDone.innerHTML = '<i class="fas fa-check-square"></i>';
            taskBtnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';

            // defining task-definition
            taskDefiniton.className = "task-definition";

            // defining task-item
            taskItem.className = "task-item";

            // adding li element to parent div element
            taskDefiniton.textContent = inputNote.value;
            taskItem.appendChild(taskDefiniton);

            // adding done button to parent div element
            taskItem.appendChild(taskBtnDone);

            // adding delete button to parent div element
            taskItem.appendChild(taskBtnDelete);

            taskList.appendChild(taskItem);

            // clear input field
            inputNote.value = "";

            taskBtnDone.addEventListener("click", function (params) {
                console.log("clicked to done");
                taskItem.classList.toggle("task-done");
            });

            taskBtnDelete.addEventListener("click", function (params) {
                console.log("clicked to delete");
                taskItem.remove();
            });
        }
    });
