/* Получение инпута и кнопки добавить */

const form = document.querySelector(".input_bar")
const input = document.querySelector(".main_input")
const tasksList = document.querySelector(".task_list")
const activ = document.querySelector(".active")
const taskFooter = document.querySelector(".task_footer")




form.addEventListener('submit', addTask) // событие + добавление задачи


  /* добавляем задачу */

function addTask(event) {
  event.preventDefault(); // отмена перезагрузки

  const taskTxt = input.value.trim(); // получение текста инпута

  /* внутрянка задачи */

  const task = ` <li class="task_wrapper">
                        <input class="checkbox" type="checkbox">
                        <span class="task_title">${taskTxt}</span>
                        <button class="del_task">❌</button>
                    </li> `;

  /* добавляем задачу в лист */

  tasksList.insertAdjacentHTML("afterbegin", task);

  input.value = ""; // очистка поля ввода
  input.focus();

  if (tasksList.children.length > 0) {
    // activ.classList.remove("activ")
    activ.classList.add("onscreen");
  }
}

tasksList.addEventListener('click', deletTask) // событие + удаление задачи
tasksList.addEventListener('click', doneTask) // событие + отметка задачи


/* удаление задачи */

function deletTask(event) {

  if (event.target.classList.contains("del_task")) {
    const taskWrapper = event.target.closest("li") // ближайший родитель
    taskWrapper.remove() // удаление родителя
  }

  if (tasksList.children.length < 1) {
    activ.classList.remove("onscreen")
  }
}


/* отметка задачи */
function doneTask(event) {
  
  if (event.target.classList.contains("checkbox")) {
    const taskWrapper = event.target.closest("li"); // ближайший родитель
    const taskTitle = taskWrapper.querySelector("p")
    taskTitle.classList.toggle("done_title");
  }
}

taskFooter.addEventListener('click', deleteAll)
taskFooter.addEventListener("click", deleteDone);


/* Удаление всех задач */

function deleteAll(event) {
  if (event.target.classList.contains("del_all")) {
    tasksList.innerHTML = "";
    activ.classList.remove("onscreen");
  }
} 

/* удаление выполненых */

function deleteDone(event) {
  if (event.target.classList.contains("del_done")) {
    const checked = tasksList.querySelectorAll(":checked")
    console.log(checked)
  }
}