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
function removeSubjectFromOptionList(e) {
  taskListText = e.target.parentElement.parentElement.firstChild.innerHTML;
  const text = e.target.parentElement.innerHTML.toLowerCase();
  console.log(taskListText);

  document.querySelectorAll('.added-option').forEach(function (i) {
    item = i.value;
    console.log(item);

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
