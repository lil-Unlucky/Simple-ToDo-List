const app = document.querySelector('.todo-app');
var itemListArr = [];
if(app !== null) {

  // MODAL
  // ADD NEW TASK - OPEN WINDOW + CLOSE WINDOW
  const addTaskBtn = document.querySelector('.task-buttons__add-new');
  const createTaskModal = document.querySelector('.modal-create-task');
  const closeTaskModal = createTaskModal.querySelector('.modal-create-task__close-modal');

  closeTaskModal.addEventListener('click', () => {
    const newTaskNameField = document.querySelector('.input-new-task-title-field');
    createTaskModal.classList.remove('active');
    newTaskNameField.style.boxShadow = 'none';
  });

  addTaskBtn.addEventListener('click', () => {
    createTaskModal.classList.add('active');
  });

  // DELETE LAST TASK IN THE TASK LIST
  const deleteLastTaskBtn = document.querySelector('.task-buttons__remove-last')
  deleteLastTaskBtn.addEventListener('click', () => {
    const tasks = document.querySelectorAll('.todo-app__item');
    const lastTask = tasks[tasks.length -1];
    lastTask.remove();
  });

  // ADD NEW TASK TO THE TASK LIST
  const applyNewTask = document.querySelector('.create-task-field__apply-button');

  applyNewTask.addEventListener('click', () => {
    const tasks = document.querySelectorAll('.todo-app__item');
    const newTaskNameField = document.querySelector('.input-new-task-title-field');
    const newTaskName = newTaskNameField.value;
    if(newTaskName === '') {
        newTaskNameField.style.boxShadow = '1px 1px 3px 3px red';
    } else if (newTaskName !== '' && tasks.length < 9) {
      createTask(newTaskName);
      document.querySelector('.input-new-task-title-field').value = '';
      createTaskModal.classList.remove('active');
    } else {
      console.error('::error::');
    }
  });

  // CREATE NEW ELEMENT TO THE TASK LIST
  function createTask(name) {
    const tasksContainer = document.querySelector('.todo-app__main');
    const newTaskItem = document.createElement('div');

    itemListArr.push(newTaskItem);
    const itemID = itemListArr.indexOf(newTaskItem) + 1;

    newTaskItem.className = 'todo-app__item active';
    newTaskItem.innerHTML = `
      <div class="todo-app__item-left">
        <div class="item-left__task-id">#<span>${itemID}</span></div>
      </div>
      <div class="todo-app__item-middle">
        <div class="item-middle__task-title"><span class="task-title__title">${name}</span></div>
        <div class="item-middle__change-title" title="Change task title"><i class="ri-quill-pen-line"></i></div>
      </div>
      <div class="todo-app__item-right">
        <div class="item-right__make-done item-right" title="Mark as done"><i class="ri-check-double-line"></i></div>
        <div class="item-right__make-active item-right" title="Mark as active"><i class="ri-close-line"></i></div>
        <div class="item-right__delete-task item-right" title="Delete task"><i class="ri-delete-bin-5-line"></i></div>
      </div>
    `;

    const setDoneBtn = newTaskItem.querySelector('.item-right__make-done');
    const setActiveBtn = newTaskItem.querySelector('.item-right__make-active');
    const deleteBtn = newTaskItem.querySelector('.item-right__delete-task');

    // MODAL
    // RENAME TASK
    const changeTitleBtn = newTaskItem.querySelector('.item-middle__change-title');
    const changeTitleModal = document.querySelector('.modal-rename-task');
    const closeChangeTitleModal = changeTitleModal.querySelector('.modal-rename-task__close-modal');

    // OPEN MODAL
    changeTitleBtn.addEventListener('click', () => {
      changeTitleModal.classList.add('active');
    });
    // CLOSE MODAL
    closeChangeTitleModal.addEventListener('click', () => {
      changeTitleModal.classList.remove('active');
    });

    // VARS
    const changeTitleInput = changeTitleModal.querySelector('.input-new-task-name-field');
    const changeTitleApply = changeTitleModal.querySelector('.rename-task-field__apply-button');

    // RENAME TASK
    // Works not correctly!
    changeTitleApply.addEventListener('click', () => {
      if (changeTitleInput.value === '') {
        changeTitleInput.style.boxShadow = '1px 1px 3px 3px red';
      } else if (changeTitleInput.value !== '') {
        const currentTaskTitle = newTaskItem.querySelector('.task-title__title');
        let newTaskTitle = changeTitleInput.value;
        currentTaskTitle.innerHTML = newTaskTitle;
        changeTitleInput.value = '';
        changeTitleModal.classList.remove('active');
      }
    });

    setDoneBtn.addEventListener('click', () => {
      newTaskItem.classList.add('done');
      newTaskItem.classList.remove('active');
      newTaskItem.style.backgroundColor = '#d9feff';
    });

    setActiveBtn.addEventListener('click', () => {
      newTaskItem.classList.remove('done');
      newTaskItem.classList.add('active');
      newTaskItem.style.backgroundColor = '#ffd9d9';
    });
    deleteBtn.addEventListener('click', () => {
      itemListArr.indexOf(newTaskItem);
      itemListArr.splice(itemListArr.indexOf(newTaskItem), 1);
      newTaskItem.remove();
    });

    tasksContainer.appendChild(newTaskItem);
    }
}