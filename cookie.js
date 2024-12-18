import { list_arr } from "./listComponents";

/*
 * function ini berfungsi untuk membaca data yang udah di simpen di local storage yang dimiliki oleh user
 *  
 * */
export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export function setCookie(name, value) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1)
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function updateCookie() {
  deleteCookie("user-todo")
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1)
  const expires = "expires=" + date.toUTCString();
  document.cookie = "user-todo" + "=" + JSON.stringify(list_arr) + ";" + expires + ";path=/";
}

