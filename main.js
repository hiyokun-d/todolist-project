import { addingTodo } from "./adding-todo";
import { deleteCookie, getCookie, setCookie } from "./cookie";
import { list_arr, Todo } from "./listComponents";
import { showNotification } from "./notification";


function initializeTodoList() {
  list_arr.length = 0;

  if (!getCookie("user-todo")) {
    setCookie("user-todo", JSON.stringify(list_arr));
    showNotification("Making new save", {
      description: "we using cookie to save your todolist and WE ARE NOT GIVE YOU ANY ADS OR TRACK YOUR ACTIVITES be happy :)",
      duration: 5000
    });
  } else {
    const savedTodoList = JSON.parse(getCookie("user-todo"));
    if (Array.isArray(savedTodoList)) {
      // Load saved data
      list_arr.push(...savedTodoList);
      savedTodoList.forEach(todo => {
        const todoItem = new Todo(todo.title);
        todoItem.id = todo.id; // Use the saved ID
        todoItem.generate(todo.date);
      });
      showNotification("Loaded data!", {
        duration: 1200
      });
    }
  }
}

initializeTodoList()
addingTodo()

function updateTodoPage() {
  list_arr.forEach((main) => {
    const generatingTodo = new Todo(main.title);
    generatingTodo.deadline("H441");
    // generatingTodo.delete("T562")
  })
}

updateTodoPage()

function deleteTodoPage() {
  showNotification("Deleting the Cookie!", {
    description: "to update the cookie just simply reload the page again!",
    duration: 1200
  })

  list_arr.length = 0;
  deleteCookie("user-todo")
  updateTodoPage();
  const containerTodo = document.getElementById("containerTodo")
  containerTodo.innerHTML = ""
}

document.addEventListener("keypress", (event) => {
  if (event.key == "~") {
    deleteTodoPage()
  }
})
