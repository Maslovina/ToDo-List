const form = document.querySelector(".input_bar");
const input = document.querySelector(".main_input");
const tasksList = document.querySelector(".task_list")
const delAll = document.querySelector(".del_all")
const delDone = document.querySelector(".del_done")
const activ = document.querySelector(".list_wrapper")

const LS_KEY = "todos"

const savedTodos = JSON.parse(localStorage.getItem(LS_KEY)) ?? []

let todos = savedTodos; // массив задач


/* Добавление в массив объекто/задачи */
function addTask(event) {
    event.preventDefault()

    const value = input.value
  if (value.trim().length) {
    todos.push({
      id: Date.now(),
      text: value,
      completed: false,
    });
      input.value = "";
      input.focus()
  }
    renderTodos()
};

/* отрисовка листа задач */
function renderTodos() {
  tasksList.innerHTML = "";
  todos.forEach((el) => {
    tasksList.append(drawTask(el));
  });
    show()
}

/* отрисовка одной задачи */
function drawTask(obj) {
    const li = document.createElement("li");
    li.classList = "task_wrapper";
    li.innerHTML = `<input class="checkbox" type="checkbox">
                    <span class="task_title">${obj.text}</span>
                    <button class="del_task">❌</button>`;

    const chk = li.querySelector(".checkbox");
    chk.checked = obj.completed;

    const delBtn = li.querySelector(".del_task")
    delBtn.addEventListener("click", () => deleteTask(obj.id))

    chk.addEventListener("change", () => toggleComplete(obj.id));
    delDone.addEventListener("click", () => delCompleted(obj.id));

    localStorage.setItem(LS_KEY, JSON.stringify(todos));

    return li;
}

form.addEventListener('submit', addTask)

/* удаление задачи */

function deleteTask(id) {

    todos = todos.filter(obj => obj.id !== id)
    renderTodos()
    
}

/* Удаление всех задач */

delAll.addEventListener("click", deleteAll);

function deleteAll() {
    todos = []
    localStorage.clear(todos) // очистка локал сторадж при удалении всех
    renderTodos()
    // activ.classList.remove("onscreen");
  
} 


/* изменение значения чекбокса  */

// function toggleComplete(id) {

//     todos = todos.map((todo) => {
//         if (todo.id !== id) {
//            return todo
//         }
//         return (todo = {
//             ...todo,
//             completed: !todo.completed,
//         })
//    })
// console.log(todos);
// }


// еще вариант изменение в массиве чекбокса
function toggleComplete  (id) {
    const findedTodo = todos.find(todo => todo.id === id)
    findedTodo.completed = !findedTodo.completed
    localStorage.setItem(LS_KEY, JSON.stringify(todos)); // перезаписывает LS при изменение чекбокса
}

/* состояние листа */

function show() {
    const inputBar = document.querySelector(".input_bar");
    const line = document.querySelector(".line")
    if (!todos.length) {
        activ.classList.remove("active");
        line.classList.remove("active");
        inputBar.classList.remove("border")
    } else {
        activ.classList.add("active");
        line.classList.add("active");
        inputBar.classList.add("border");
    }
}
show()


/* Удаление завершенных */
function delCompleted() {
todos = todos.filter((obj) => obj.completed !== true);
renderTodos();
}
renderTodos();