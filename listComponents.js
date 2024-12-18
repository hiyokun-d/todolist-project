import { updateCookie } from "./cookie";

// untuk nyimpen ID, TITLE dan sebagainya supaya bisa di akses lagi
export let list_arr = [
  // {
  //   id: "A321",
  //   title: "TEST_TITLE",
  //   description: "lorem ipsum dolor ",
  //   date: new Date().toDateString()
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
  constructor(input) {
    this.input = input;
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
   * @returns {HTMLElement}
   */
  generate(oldDate) {
    // Kode untuk menghasilkan elemen todo baru dan menambahkannya ke arr_todo
    const date = new Date().toLocaleString();
    const containerTodo = document.getElementById("containerTodo")

    // buat dulu elementnya coy
    const newElement = document.createElement("div")

    // baru kita isi dengan element yang kita mau
    console.log(oldDate)
    newElement.innerHTML = `
         <label for="todoContainer">
          <h3>${this.input}</h3>
          <p class="date">${oldDate ? oldDate : date}</p>
        </label>
        <input name="todoContainer" type="checkbox" id=${this.id} class="todo-checkbox">
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
        date
      });
      updateCookie(); // Update cookie only when adding new item
    }
  }
}
