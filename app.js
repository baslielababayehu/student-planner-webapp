//define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task-form');
const addTaskButton = document.querySelector('#add-task');
const deleteButton = document.querySelector('.delete-item');

const classInput = document.querySelector('#class-form');
const addClassButton = document.querySelector('#add-a-class-btn');
const listOfClasses = document.querySelector('.class-list');

const classOptionList = document.querySelector('#class-option-list');
const removeClassButton = document.querySelector('#remove-classIcon');

// load all event listeners
loadEventListeners();
function loadEventListeners() {
  addTaskButton.addEventListener('click', addTask);
  taskList.addEventListener('click', removeTask);
  addClassButton.addEventListener('click', addClass);
  listOfClasses.addEventListener('click', removeSubjectFromList);
  // classOptionList.addEventListener('click', removeSubjectFromOptionList);
}

//Add Class
function addClass(e) {
  if (classInput.value === '') {
    alert('Add a Class');
    return 0;
  }

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
// remove class form options
function removeSubjectFromOptionList() {
  let classesToBeDeleted = document.querySelectorAll('.added-option');
  let currentClassesAvailable = document.querySelectorAll('.currentClasses');
  // classesToBeDeleted[1].remove();
  // console.log(classesToBeDeleted[1]);

  const currentClassesAvailableArray = [];
  for (i = 0; i < currentClassesAvailable.length; i++) {
    currentClassesAvailableArray.push(currentClassesAvailable[i].innerHTML);
  }

  const classesToBeDeletedArray = [];
  for (i = 0; i < classesToBeDeleted.length; i++) {
    classesToBeDeletedArray.push(classesToBeDeleted[i].innerHTML);
  }

  // classesToBeDeleted = classesToBeDeleted.innerHTML;
  // currentClassesAvailable = currentClassesAvailable.innerHTML;

  // console.log(currentClassesAvailableArray);

  // const currentClassesAvailableArray = Array.apply(
  //   null,
  //   currentClassesAvailable
  // );

  // const classesToBeDeletedArray = Array.apply(null, classesToBeDeleted);

  // console.log(currentClassesAvailableArray);

  // for (let i = 0; i < classesToBeDeleted.length; i++) {
  //   if (classesToBeDeleted[i].value != currentClassesAvailable[i].value) {
  //     console.log(classesToBeDeleted[i]);
  //   }
  // }
  // console.log(classesToBeDeleted[3]);
  // console.log(currentClassesAvailable[3]);
  // for (let i = 0; i < currentClassesAvailableArray.length; i++) {

  //   if (
  //     classesToBeDeleted[i] != currentClassesAvailable[0] &&
  //     classesToBeDeleted[i] != currentClassesAvailable[1] &&
  //     classesToBeDeleted[i] != currentClassesAvailable[2] &&
  //     classesToBeDeleted[i] != currentClassesAvailable[3]
  //   ) {
  //     console.log(classesToBeDeleted[i]);
  //     classesToBeDeleted[i].remove();
  //   }

  //   if (
  //     currentClassesAvailableArray.some(
  //       (i) => classesToBeDeletedArray.indexOf(i) >= 0
  //     ) == true
  //   ) {
  //     // console.log(classesToBeDeleted[i]);
  //     // classesToBeDeletedArray.splice(i, 1);
  //     console.log(classesToBeDeleted[i]);
  //     classesToBeDeleted[i].remove();
  //   }
  // }
  // const found = currentClassesAvailableArray.some(
  //   (i) => classesToBeDeletedArray.indexOf(i) >= 0
  // );

  // console.log(found);

  // for (let i = 0; i < classesToBeDeleted.length; i++) {
  //   for (let j = 0; j < currentClassesAvailable.length; j++) {
  //     if (classesToBeDeleted[i].value != currentClassesAvailable[j].value) {
  //       console.log(classesToBeDeleted[i]);
  //       classesToBeDeleted[i].remove();
  //     }
  //   }
  // }

  // if (classToBeDeleted.classList.contains(""))
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
  const para = document.createElement('p');
  para.className = 'the-added-task';
  const classIcon = document.querySelector('#class-icon');
  const classIconCopy = classIcon.cloneNode(true);

  para.appendChild(document.createTextNode(taskInput.value + '     '));
  para.appendChild(classIconCopy);
  li.appendChild(para);

  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
  e.preventDefault();
}

//remove task
function removeTask(e) {
  const iconIsClicked = e.target.parentElement.classList.contains(
    'delete-item'
  );
  if (iconIsClicked) {
    console.log(e.target);
    confirm('are you sure');
    e.target.parentElement.parentElement.remove();
  }
  e.preventDefault();
}
