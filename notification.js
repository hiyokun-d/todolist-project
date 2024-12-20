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

import anime from "animejs";

const elContainer = document.getElementById("todo-notification-container");

// initParticleBackground(elContainer);
const elTitle = document.getElementById("todo-notification-title");
const elDescription = document.getElementById("description");
const elButtonsDiv = document.getElementById("buttons-notification");
const elTodoNotificationExit = document.getElementById("todo-notification-exit");

function initParticleBackground(container) {
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'absolute';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  particleContainer.style.overflow = 'hidden';
  particleContainer.style.pointerEvents = 'none';
  container.appendChild(particleContainer);

  const colors = ['#4ecdc4', '#ff6b6b', '#f9d56e', '#ff9ff3'];
  const createExplosiveParticles = (x, y) => {
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${anime.random(4, 15)}px`;
      particle.style.height = `${anime.random(4, 15)}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particleContainer.appendChild(particle);

      anime({
        targets: particle,
        translateX: () => anime.random(-300, 300),
        translateY: () => anime.random(-300, 300),
        scale: [1, anime.random(0.1, 2)],
        opacity: [1, 0],
        rotate: () => anime.random(-360, 360),
        duration: anime.random(800, 1500),
        easing: 'easeOutQuad',
        complete: () => particle.remove()
      });
    }
  };

  // Continuous background particles
  const createConstantParticles = () => {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.left = `${anime.random(0, container.offsetWidth)}px`;
    particle.style.top = `${anime.random(0, container.offsetHeight)}px`;
    particle.style.width = `${anime.random(2, 8)}px`;
    particle.style.height = `${anime.random(2, 8)}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particleContainer.appendChild(particle);

    anime({
      targets: particle,
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      scale: [0, 1, 0],
      opacity: [0.3, 0.7, 0],
      duration: anime.random(2000, 4000),
      easing: 'easeInOutQuad',
      complete: () => particle.remove()
    });
  };

  // Periodic constant particles
  setInterval(createConstantParticles, 500);

  // Attach explosion to container interactions
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createExplosiveParticles(x, y);
  });

  // Initial explosion
  createExplosiveParticles(
    container.offsetWidth / 2,
    container.offsetHeight / 2
  );
}

function setupButtonAnimations(buttons, closeButton) {
  // Close button with intense animation
  closeButton.addEventListener('mouseenter', () => {
    anime({
      targets: closeButton,
      scale: [1, 1.3, 1],
      rotate: [0, 15, -15, 0],
      duration: 500,
      easing: 'easeInOutElastic(1, 0.6)'
    });
  });

  closeButton.addEventListener('click', (e) => {
    const colors = ['#ff6b6b', '#ff9ff3', '#4ecdc4'];

    // Explosive close button effect
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 15}px`;
      particle.style.height = `${Math.random() * 15}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      e.target.appendChild(particle);

      anime({
        targets: particle,
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-200, 200),
        scale: [1, 0],
        opacity: [1, 0],
        rotate: () => anime.random(-360, 360),
        duration: 1000,
        easing: 'easeOutQuad',
        complete: () => particle.remove()
      });
    }
  });

  // Animate other buttons
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      anime({
        targets: button,
        scale: [1, 1.1],
        rotate: [0, 5, -5, 0],
        duration: 300,
        easing: 'easeInOutQuad'
      });
    });

    button.addEventListener('mouseleave', () => {
      anime({
        targets: button,
        scale: [1.1, 1],
        rotate: 0,
        duration: 300,
        easing: 'easeInOutQuad'
      });
    });

    button.addEventListener('click', (e) => {
      const colors = ['#4ecdc4', '#ff6b6b', '#f9d56e'];

      // Click explosion effect
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 10}px`;
        particle.style.height = `${Math.random() * 10}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        e.target.appendChild(particle);

        anime({
          targets: particle,
          translateX: () => anime.random(-100, 100),
          translateY: () => anime.random(-100, 100),
          scale: [1, 0],
          opacity: [1, 0],
          rotate: () => anime.random(-360, 360),
          duration: 800,
          easing: 'easeOutQuad',
          complete: () => particle.remove()
        });
      }
    });
  });
}

let closingNotif;
const autoHeight = elContainer.scrollHeight;
const autoWidth = elContainer.scrollWidth;

/*
 * For closing the notification we can use this
 * */
export const closeNotification = () => {
  elContainer.classList.add("close");
  clearTimeout(closingNotif);

  anime.timeline({
    targets: elContainer,
    easing: "easeInOutQuad",
    transformOrigin: "30% -100%",
    autoplay: true,
    duration: 500, // Adjust as needed
  })
    .add({
      height: [autoHeight, 80],  // Smoothly collapse the height to 0
      duration: 600,
      easing: "easeInOutCubic",
    })
    .add({
      width: [autoWidth / 2, 70],  // Shrink the width (optional)
      duration: 800,
      easing: "easeInOutCubic",
    })
    .add({
      rotate: [0, 90],
      duration: 800,
      delay: 100,
      easing: 'easeInOutElastic'
    })
    .add({
      translateX: [0, "-100%"],
      duration: 500,
      delay: 200,
      easing: 'easeInBack'
    });
};

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
export function showNotification(title, {
  description,
  buttons = [],
  buttonAction = [],
  duration = 9000
} = {}) {

  // Reset and prepare container
  elContainer.style.opacity = 0;
  elContainer.style.transform = 'translateX(-100%) rotate(-15deg)';

  // Set content
  elTitle.innerText = title;
  elDescription.innerText = description || "";
  elDescription.classList.toggle("hide", !description);

  // Clear previous buttons
  elButtonsDiv.innerHTML = "";

  // Create buttons with explosive animations
  const buttonElements = [];
  buttons.forEach((buttonObj, index) => {
    const button = document.createElement("button");
    button.innerText = buttonObj.name || "Button";
    button.className = buttonObj.class || "";

    if (buttonAction[index]) {
      button.addEventListener("click", (e) => {
        buttonAction[index](e);
      });
    }

    elButtonsDiv.appendChild(button);
    buttonElements.push(button);
  });
  setupButtonAnimations(buttonElements, elTodoNotificationExit);

  // Entrance animation with multiple effects
  anime.timeline({
    targets: elContainer,
    easing: 'easeOutExpo',
    duration: 1200,
    begin: () => {
      elContainer.style.overflow = 'hidden';  // Hide overflow during animation
    },
    complete: () => {
      elContainer.style.overflow = '';  // Reset overflow after animation
    }
  })
    .add({
      opacity: [0, 1],
      translateX: ['-100%', '0%'],
      rotate: [-15, 0],
      duration: 600,
    })
    .add({
      height: [80, autoHeight],  // Animate height from 0 to auto height
      duration: 300,
      easing: 'easeOutExpo',
    })
    .add({
      width: [70, autoWidth / 2],  // Full width responsive to the parent container
      duration: 400,
      easing: 'easeInOutQuad',
      offset: '-=200'
    });

  elTodoNotificationExit.addEventListener("click", closeNotification);
  closingNotif = setTimeout(closeNotification, duration);
}
