let tasks = [];

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;

  const task = {
    id: Date.now(),
    title,
    description,
    status: 'todo'
  };

  tasks.push(task);
  displayTask(task);
  clearForm();
});

function displayTask(task) {
  const taskElement = createTaskElement(task);

  const taskList = getTaskListElement(task.status);
  taskList.appendChild(taskElement);
}

function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.textContent = task.title + ': ' + task.description;

  const changeStatusButton = createChangeStatusButton(task.id, task.status);
  taskElement.appendChild(changeStatusButton);

  const deleteButton = createDeleteButton(task.id);
  taskElement.appendChild(deleteButton);

  return taskElement;
}

function getTaskListElement(status) {
  if (status === 'todo') {
    return document.getElementById('todoList');
  } else if (status === 'doing') {
    return document.getElementById('doingList');
  } else if (status === 'done') {
    return document.getElementById('doneList');
  }
}

function createChangeStatusButton(taskId, currentStatus) {
  const button = document.createElement('button');

  if (currentStatus === 'todo') {
    button.textContent = 'Iniciar';
    button.addEventListener('click', function () {
      const task = tasks.find(task => task.id === taskId);
      task.status = 'doing';
      moveTaskElement(taskId, currentStatus, 'doing');
    });
  } else if (currentStatus === 'doing') {
    button.textContent = 'Completar';
    button.addEventListener('click', function () {
      const task = tasks.find(task => task.id === taskId);
      task.status = 'done';
      moveTaskElement(taskId, currentStatus, 'done');
    });
  }

  return button;
}

function createDeleteButton(taskId) {
  const button = document.createElement('button');
  button.textContent = 'Eliminar';

  button.addEventListener('click', function () {
    tasks = tasks.filter(task => task.id !== taskId);
    removeTaskElement(taskId);
  });

  return button;
}

function moveTaskElement(taskId, currentStatus, newStatus) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  const newTaskList = getTaskListElement(newStatus);
  newTaskList.appendChild(taskElement);

  const oldTaskList = getTaskListElement(currentStatus);
  oldTaskList.removeChild(taskElement);
}

function removeTaskElement(taskId) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  const taskList = taskElement.parentNode;
  taskList.removeChild(taskElement);
}

function clearForm() {
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionInput').value = '';
}
