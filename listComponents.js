import { updateCookie } from "./cookie";
import { showNotification } from "./notification";

// untuk nyimpen ID, TITLE dan sebagainya supaya bisa di akses lagi
export let list_arr = [
  // {
  //   id: "A321",
  //   title: "TEST_TITLE",
  //   description: "lorem ipsum dolor ",
  //   date: new Date().toDateString()
  //   deadline: "9 days"
  // }
]

/**
 * Kelas yang merepresentasikan item Todo.
 */
export class Todo {
  /**
   * Membuat instance baru dari Todo.
   * @param {String} input - Input tugas dalam bentuk string atau elemen input.
   * Ingat bre ini tuh input jadi harus {String} gak boleh yang lain
   *  */
  constructor(input = "") {
    this.input = input || "";
    this.id = this.#generateID()
  }

  // untuk ngegenerate ID dan gunanya # biar functionnya jadi private dan gak bisa di pake diluar classnya
  #generateID() {
    const getFirstLetter = this.input.charAt(0).toUpperCase()
    const randomNumber = Math.floor(100 + Math.random() * 900)
    return `${getFirstLetter}${randomNumber}`
  }

  /* REFERENCE DOANG INI
       <div class="containerTodo">
        <label for="todoContainer">
          <h3>Task list</h3>
        </label>
        <input name="todoContainer" type="checkbox">
      </div>
  
   */

  /**
   * Menghasilkan elemen todo baru dengan gaya dan class yang sama, lalu menambahkannya ke array todos.
   * @param {Array} [arr_todo=[]] - Array untuk menyimpan elemen todo yang dihasilkan.
   * @param {Date} [deadline] - Pastikan user mengirimkan date yang bener 
   * @returns {HTMLElement}
   */
  generate(oldDate,) {
    // Kode untuk menghasilkan elemen todo baru dan menambahkannya ke arr_todo
    const date = oldDate ? oldDate : new Date().toLocaleString();
    const containerTodo = document.getElementById("containerTodo")

    // buat dulu elementnya coy
    const newElement = document.createElement("div")

    // baru kita isi dengan element yang kita mau
    console.log(date)
    newElement.innerHTML = `
         <label for="todoContainer">
          <h3>${this.input}</h3>
          <p class="date" data-date="${date}">${date}</p>
        </label>
        <div class="todo-input">
          <input name="todoContainer" type="checkbox" data-input-id=${this.id} class="todo-checkbox">
          <button class="delete-Todo" data-id="${this.id}">delete</button>
        </div>

      `

    // kita tambahin class untuk stylingnya ama ID buat mudahin ntar kalo mau nambah delete ama checkboxnya aowkoawkaowk
    newElement.classList.add("new")
    newElement.classList.add("containerTodo")
    newElement.id = this.id;

    containerTodo.appendChild(newElement)
    if (!list_arr.some(item => item.id === this.id)) {
      list_arr.push({
        id: this.id,
        title: this.input,
        date,
        // deadlineDate
      });
      updateCookie(); // Update cookie only when adding new item
    }
  }

  deadline(id) {
    const element = document.getElementById(id);
    if (element)
      element.classList.add("deadline");
    else throw new Error(`the element with an id ${id} is not found!`);
  }

  delete(id) {
    const deleteElement = document.getElementById(id);
    console.log(id)
    const index = list_arr.findIndex(todo => todo.id === id);
    if (index !== -1) {
      showNotification(`DELETE: ${list_arr[index].title}`, {
        duration: 1200
      })
      list_arr.splice(index, 1);
      console.log(list_arr);
      if (deleteElement) {
        deleteElement.remove()
      }

      updateCookie("user-todo")


    }
  }
}
