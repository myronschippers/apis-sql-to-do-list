console.log('JS WORKING!!!')
$(document).ready(init);

function init() {
  console.log('DOM Ready for manipulation');
  $('.js-btn-save').on('click', clickSave);
  $('.js-tasks-list').on('click', '.js-btn-status-change', clickStatus);
  $('.js-tasks-list').on('click', '.js-btn-delete', clickDelete);

  getTasks();
}

function clickDelete() {
  const taskId = $(this).data('id');

  deleteTask(taskId);
}

function clickSave(event) {
  const taskData = {
    description: $('.js-field-description').val(),
  };

  saveNewTask(taskData);
  $('.js-field-description').val('');
}

function clickStatus() {
  const updateData = {
    complete: $(this).data('complete')
  };
  const taskId = $(this).data('id');

  updateTaskComplete(taskId, updateData);
}

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/api/tasks'
  })
    .then((response) => {
      render(response);
    })
    .catch((err) => {
      console.log(err);
      alert('Danger Will Robinson!!!!');
    });
}

function saveNewTask(task) {
  $.ajax({
    type: 'POST',
    url: '/api/tasks',
    data: task
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('Danger Will Robinson!!!!');
    });
}

function updateTaskComplete(id, currentComplete) {
  const newCompleteStatus = {
    complete: !currentComplete.complete,
  };

  $.ajax({
    type: 'PUT',
    url: `/api/tasks/${id}`,
    data: newCompleteStatus
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('Danger Will Robinson!!!!');
    });
}

function deleteTask(id) {
  $.ajax({
    type: 'DELETE',
    url: `/api/tasks/${id}`,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.log(err);
      alert('Danger Will Robinson!!!!');
    });
}

function render(tasksList) {
  const $tasksList = $('.js-tasks-list').text('WOW');

  $tasksList.empty();
  for (let task of tasksList) {
    let statusClass = 'statusIcon-negative';
    let statusItem = null;

    if (task.complete === true) {
      statusClass = 'statusIcon-positive';
      statusItem = 'complete';
    }

    $tasksList.append(`
      <li class="${statusItem}">
        ${task.description}
        <span
          class="statusIcon ${statusClass} js-btn-status-change"
          data-id="${task.id}"
          data-complete="${task.complete}"
        >
        </span>
        <button class="js-btn-delete" data-id="${task.id}">DELETE</button>
      </li>
    `);
  }
}