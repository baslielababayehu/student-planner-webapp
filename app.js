//define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');

const taskInput = document.querySelector('#task-form');
const addTaskButton = document.querySelector('#add-task');
const deleteButton = document.querySelector('.delete-item');

const classInput = document.querySelector('#class-form');
const addClassButton = document.querySelector('#add-a-class-btn');
const listOfClasses = document.querySelector('.class-list');

const classOptionList = document.querySelector('#class-option-list');
const removeClassButton = document.querySelector('#remove-classIcon');

const filterButton = document.querySelector('#filter');

// load all event listeners
loadEventListeners();
function loadEventListeners() {
  addTaskButton.addEventListener('click', addTask);
  taskList.addEventListener('click', removeTask);
  addClassButton.addEventListener('click', addClass);
  listOfClasses.addEventListener('click', removeSubjectFromList);
  filterButton.addEventListener('keyup', filterTasks);
  listOfClasses.addEventListener('click', removeSubjectFromOptionList);
  document.addEventListener('DOMContentLoaded', getTasks);
}

//Add Class
function addClassUIItems() {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  const btn = document.createElement('button');
  btn.id = 'class-icon';

  const removeIcon = document.createElement('a');
  removeIcon.className = 'remove-classIcon';
  removeIcon.id = 'remove-classIcon';
  removeIcon.innerHTML = '<i class="fas fa-times ml-2"></i>';

  btn.className = 'btn btn-dark currentClasses';
  li.appendChild(btn);
  li.appendChild(removeIcon);
  btn.appendChild(document.createTextNode(classInput.value));
  listOfClasses.appendChild(li);

  const addOption = document.createElement('option');
  addOption.className = 'added-option';
  addOption.value = `${classInput.value}`;
  addOption.innerHTML = `${classInput.value}`;

  classOptionList.appendChild(addOption);
}
function addClass(e) {
  if (classInput.value === '') {
    alert('Add a Class');
    return 0;
  }

  addClassUIItems();

  //add class to local storage
  storeClassesInLocalStorage(classInput.value);

  e.preventDefault();
}

//Remove Class from List
function removeSubjectFromList(e) {
  if (e.target.parentElement.classList.contains('remove-classIcon')) {
    e.target.parentElement.parentElement.remove();
    removeSubjectFromOptionList();
  }
  e.preventDefault();
}

// remove class form options list
function removeSubjectFromOptionList(e) {
  taskListText = e.target.parentElement.parentElement.firstChild.innerHTML;
  const text = e.target.parentElement.innerHTML.toLowerCase();

  document.querySelectorAll('.added-option').forEach(function (i) {
    item = i.value;

    if (item.toLowerCase() === taskListText.toLowerCase()) {
      i.remove();
    }
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return 0;
  } else if (classOptionList.value === '0') {
    alert('Add a class');
    return 0;
  }

  const li = document.createElement('li');
  li.className = 'list-group-item';
  const para = document.createElement('b');
  para.className = 'the-added-task';
  const classIcon = document.querySelector('#class-icon');
  const classIconCopy = classIcon.cloneNode(true);
  classIconCopy.className = 'btn btn-dark currentClasses ';

  para.appendChild(document.createTextNode(taskInput.value + '     '));
  para.appendChild(classIconCopy);
  li.appendChild(para);

  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  const addedMargin = document.createElement('i');
  addedMargin.innerHTML = ' \xa0\xa0\xa0\xa0\xa0\xa0\xa0';

  li.appendChild(addedMargin);

  li.appendChild(link);

  taskList.appendChild(li);
  e.preventDefault();

  //store task in local storage
  storeTaskInLocalStorage(taskInput.value);
}

//store classes in LS
function storeClassesInLocalStorage(theClass) {
  let classes;
  if (localStorage.getItem('classes') === null) {
    classes = [];
  } else {
    classes = JSON.parse(localStorage.getItem('classes'));
  }
  classes.push(theClass);
  localStorage.setItem('classes', JSON.stringify(classes));
}

//get classes from LS
function getTheClasses() {
  let classes;
  if (localStorage.getItem('classes') === null) {
    classes = [];
  } else {
    classes = JSON.parse(localStorage.getItem('classes'));
  }
  classes.forEach(function (classInput) {
    addClassUIItems();
  });
}

//store tasks
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const para = document.createElement('b');
    para.className = 'the-added-task';
    // const classIcon = document.querySelector('#class-icon');
    // const classIconCopy = classIcon.cloneNode(true);
    // classIconCopy.className = 'btn btn-dark currentClasses ';

    para.appendChild(document.createTextNode(task));
    // para.appendChild(classIconCopy);
    li.appendChild(para);

    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    const addedMargin = document.createElement('i');
    addedMargin.innerHTML = ' \xa0\xa0\xa0\xa0\xa0\xa0\xa0';

    li.appendChild(addedMargin);

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

//remove task
function removeTask(e) {
  const iconIsClicked = e.target.parentElement.classList.contains(
    'delete-item'
  );
  if (iconIsClicked) {
    confirm('are you sure');
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
  }

  e.preventDefault();
}

//remove task from local storage

function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // console.log(tasks[13]);
  // console.log(taskItem.firstChild.textContent);
  taskItemText = taskItem.firstChild.textContent;

  tasks.forEach(function (task, index) {
    // console.log(index);
    // console.log(task);
    if (taskItemText === task) {
      console.log(taskItem.firstChild.textContent);
      console.log(task);
      tasks.splice(index, 1);
      return 0;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e) {
  console.log(e.target);

  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.the-added-task').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.parentElement.style.display = 'block';
    } else {
      task.parentElement.style.display = 'none';
    }
  });
}
