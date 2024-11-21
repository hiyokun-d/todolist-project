import { addingTodo } from "./adding-todo";
import { list_arr, Todo } from "./listComponents";
import { showNotification } from "./notification";

const inputTodo = document.getElementById("todo-input")
const addButton = document.getElementById("todo-button")

// nih caranya kalo mau make
// const todo = new Todo("alpen jomok")
// todo.generate()
// console.log(list_arr)

showNotification("Apakabar bang", {
  description: "ini cuman dummy notification doang awokaowkaowk",
  buttons: [{
    name: "button1",
    class: "primary-button"
  },
  {
    name: "button2",
    class: "secondary-button"
  }
  ]
})

//TODO: NGESAVE SEMUA TODOLIST DISAAT PENDUKUNG PRABOWO OKE OKE GAS KAU MALAH NGESAVE DATA USER ITU GAK RESPECT BANGET PEN
addButton.addEventListener("click", () => {
  // CODE LU
})

addingTodo()
