console.log('JS WORKING!!!')
$(document).ready(init);

function init() {
  console.log('DOM Ready for manipulation');

  getTasks();
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

function render(tasksList) {
  const $tasksList = $('.js-tasks-list').text('WOW');

  $tasksList.empty();
  for (let task of tasksList) {
    $tasksList.append(`
      <li>
        ${task.description}, COMPLETE: ${task.complete}
      </li>
    `);
  }
}