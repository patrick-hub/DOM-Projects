// define the UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')


// Call a fucntion to Load all event listeners
loadEventListeners();

// create function load all event listeners
function loadEventListeners() {
    // Create a DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // remove task events
    taskList.addEventListener('click', removeTask);
    // Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
} 

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task) {
     // create li elements
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item';

    // create textnode and append to the li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link);

    // append li to the ul
    taskList.appendChild(li)
    })
};

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    } 

    // create li elements
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item';

    // create textnode and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link);

    // append li to the ul
    taskList.appendChild(li);

    // store in Local Storage
storeTaskInLocalStorage(taskInput.value);
// clear input
  taskInput.value = '';
    e.preventDefault()

}

// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
     
    }
}

// remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

}

//Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    // clear from Local Storage
    clearTasksFromLocalStorage();
}

// clear tasks from Local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
const text = e.target.value.toLowerCase();

document.querySelectorAll('.collection-item').forEach(function(task) {
const item = task.firstChild.textContent;
if (item.toLowerCase().indexOf(text) != -1)  {
    task.style.display = 'block';
} else {
task.style.display = 'none';
}
});

}