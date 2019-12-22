//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners()
{
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);

  //Add tasks event
  form.addEventListener('submit',addTask);

  //Remove tasks event
  taskList.addEventListener('click',removeTask);

  //Clear tasks event
  clearBtn.addEventListener('click',clearTasks);

  //Filter tasks event
  filter.addEventListener('keyup',filterTasks);

  
}

//Get Tasks from Local Storage

function getTasks()
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create Li Elements
  const li = document.createElement('li');

  //Add class
  li.className = 'collection-item';

  //Create a text node and append to the li
  li.appendChild(document.createTextNode(task));

  //Create new link element
  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';

  //Add icon html
  link.innerHTML= '<i class="fa fa-remove"></i>';
  
  //Append link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  })
}

//Add a task
function addTask(e)
{
  if(taskInput.value === '')
  {
    alert('Add a task');
  }

  //Create Li Elements
  const li = document.createElement('li');

  //Add class
  li.className = 'collection-item';

  //Create a text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create new link element
  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';

  //Add icon html
  link.innerHTML= '<i class="fa fa-remove"></i>';
  
  //Append link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store to Local Storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  taskInput.value = '';

e.preventDefault();
}

//Store Tasks
function storeTaskInLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove tasks list from Local Storage
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm('Are you sure?'))
    {
    e.target.parentElement.parentElement.remove();

    //Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


//Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index)
  {
    if(taskItem.textContent === task)
    {
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear tasks
function clearTasks()
{
  //faster
  while(taskList.firstChild)
  {
    taskList.removeChild(taskList.firstChild);
  }

  clearFromLocalStorage();
}

//Clear from Local Storage
function clearFromLocalStorage()
{
  localStorage.clear();
}

//Filter tasks
function filterTasks(e)
{
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task)
  {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1)
    {
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';
    }
  });
}