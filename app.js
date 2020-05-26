//define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task-form');
const addTaskButton = document.querySelector('#add-task');
const deleteButton = document.querySelector('.delete-item');

const classInput = document.querySelector('#class-form');
const addClassButton = document.querySelector('#add-a-class-btn');
const classList = document.querySelector('.class-list');

const classOptionList = document.querySelector('#class-option-list');

// load all event listeners
loadEventListeners();
// Load all event listeners
function loadEventListeners() {
  addTaskButton.addEventListener('click', addTask);
  taskList.addEventListener('click', removeTask);
  addClassButton.addEventListener('click', addClass);
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
  removeIcon.innerHTML = '<i class="fas fa-times ml-2"></i>';

  btn.className = 'btn btn-dark';
  li.appendChild(btn);
  li.appendChild(removeIcon);
  btn.appendChild(document.createTextNode(classInput.value));
  classList.appendChild(li);

  const addOption = document.createElement('option');
  addOption.value = `${classInput.value}`;
  addOption.innerHTML = `${classInput.value}`;

  classOptionList.appendChild(addOption);

  e.preventDefault();
}

//Remove Class

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return 0;
  } else if (classOptionList.value === '0') {
    alert('add a class');
    return 0;
  }

  //Create li element
  const li = document.createElement('li');
  //Add class
  li.className = 'list-group-item';
  const para = document.createElement('p');
  para.className = 'the-added-task';
  const classIcon = document.querySelector('#class-icon');

  para.appendChild(document.createTextNode(taskInput.value + '     '));
  para.appendChild(classIcon);
  li.appendChild(para);

  // Create text node and append to the li
  // li.appendChild(document.createTextNode(taskInput.value + '     '));
  //create new link element

  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
  e.preventDefault();
}

function removeTask(e) {
  // const toBeDeleted = document.querySelector('.list-group-item');

  // const strikeThroughItem = document.querySelector('.the-added-task');
  const iconIsClicked = e.target.parentElement.classList.contains(
    'delete-item'
  );
  if (iconIsClicked) {
    console.log(e.target);
    confirm('are you sure');
    e.target.parentElement.parentElement.remove();
  }
  // toBeDeleted.remove();

  // innerHTML = `<p><del>${toBeDeleted}</del></p>`;

  e.preventDefault();
}
