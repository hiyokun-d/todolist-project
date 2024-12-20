import { addingTodo } from "./adding-todo";
import { deleteCookie, getCookie, setCookie, updateCookie } from "./cookie";
import { list_arr, Todo } from "./listComponents";
import { showNotification } from "./notification";

const deleteButton = document.getElementsByClassName("delete-Todo")


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
        description: "All your data has been loaded from the cookie :)",
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
    // generatingTodo.delete("T562")
  })
}

updateTodoPage()
/* DELETE FUNCTION SOMETHING SOMETHING AOWOAWKOAWKOAKWO */

function deleteTodo(e) {
  console.log("h")


  updateTodoPage();
  const deletingTodo = new Todo();
  const todoId = e.target.getAttribute('data-id');
  deletingTodo.delete(todoId)
  console.log(todoId)
}

Array.from(deleteButton).forEach(button => button.addEventListener("click", deleteTodo))

function deleteEntireTodoPage() {
  list_arr.length = 0;
  deleteCookie("user-todo")
  updateTodoPage();
  const containerTodo = document.getElementById("containerTodo")
  containerTodo.innerHTML = ""
}

document.addEventListener("keypress", (event) => {
  if (event.key == "~") {
    deleteEntireTodoPage()
  }
})
