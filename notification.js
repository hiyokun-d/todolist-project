/*
     <div class="todo-notification-header">
       <h3 id="title">CONTEXT!</h3>
       <button id="todo-notification-exit" class="todo-notification-exit">x</button>
     </div>
     <p id="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptas ut? Sed illo, at fuga,
       quaerat
       laboriosam pariatur totam ipsa voluptatem exercitationem iste odio. Dicta reiciendis et dolor. Saepe,
       aspernatur!</p>
     <div class="todo-notification-buttons" id="buttons-notification">
       <button class="primary-button">button 1</button>
       <button class="secondary-button">button 2</button>
       <button class="secondary-button">button 3</button>
     </div>
  */

/**
 * Displays a notification with customizable title, description, buttons, and actions.
 *
 * @param {string} title - The title of the notification.
 * @param {Object} options - An object containing the description, buttons, and button actions.
 * @param {string} [options.description=""] - The description to display in the notification. If empty, it hides the description.
 * @param {Array<Object>} [options.buttons=[]] - An array of button objects to display in the notification.
 * @param {string} options.buttons[].name - The label for the button.
 * @param {string} [options.buttons[].class] - The CSS class to apply to the button (optional).
 * @param {Array<Function>} [options.buttonAction=[]] - An array of functions corresponding to button click actions. The index of the function matches the button.
 * @param {number} [options.duration=1000] - for the duration of the notification by default it's 7000
 *
 * @example
 * showNotification("Notification Title", {
 *   description: "This is a description",
 *   buttons: [
 *     { name: "OK", class: "ok-button" },
 *     { name: "Cancel", class: "cancel-button" }
 *   ],
 *   buttonAction: [
 *     () => console.log("OK clicked"),
 *     () => console.log("Cancel clicked")
 *   ]
 * });
 */

export function showNotification(title, { description, buttons = [], buttonAction = [], duration } = {}) {
  const elContainer = document.getElementById("todo-notification-container");
  elContainer.classList.remove("close");


  if (!elContainer) {
    console.error("Notification container element not found. Ensure that an element with ID 'todo-notification-container' exists in the DOM.");
    return;
  }

  elContainer.classList.remove("close");
  const elTitle = document.getElementById("todo-notification-title");
  const elDescription = document.getElementById("description");
  const elButtonsDiv = document.getElementById("buttons-notification");
  const elTodoNotificationExit = document.getElementById("todo-notification-exit")

  if (!elTitle || !elDescription || !elButtonsDiv) {
    console.error("One or more notification elements (title, description, buttons) not found in the DOM.");
    return;
  }

  elTitle.innerText = title;

  if (description) {
    elDescription.classList.remove("hide");
    elDescription.innerText = description || "";
  } else {
    elDescription.classList.add("hide");
  }

  elButtonsDiv.innerHTML = "";
  if (buttons.length > 0) {
    buttons.forEach((buttonObj, index) => {
      const button = document.createElement("button")
      if (buttonObj && buttonObj.name) {
        button.innerText = buttonObj.name;
        if (buttonObj.class) {
          button.className = buttonObj.class;
        }
      }

      if (buttonAction[index]) {
        button.addEventListener("click", buttonAction[index])
      }

      elButtonsDiv.appendChild(button)
    })
  }

  let valueDuration = duration || 8000
  elTodoNotificationExit.addEventListener("click", () => {
    valueDuration = 0
    elContainer.classList.add("close")
  })

  setTimeout(() => elContainer.classList.add("close"), valueDuration)
}
