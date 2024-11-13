import anime from "animejs";
const popupMenu = document.getElementById("menu")
const containerPopup = document.getElementById("popup-container")
const addButton = document.getElementById("todo-button");
const cancelButton = document.querySelector(".cancel");
let isShowPopup = false;

function showPopup(e) {
  containerPopup.classList.remove("hide");
  popupMenu.classList.replace("hide-popup", "show-popup");

  // Animate popup appearance
  anime.timeline({
    duration: 600,
    easing: 'easeOutExpo'
  })
    .add({
      targets: '.box-popup',
      backgroundColor: 'rgba(74, 98, 138, 0.8)',
      backdropFilter: ['blur(0px)', 'blur(8px)'],
    })
    .add({
      targets: '.menu',
      translateY: [-50, 0],
      scale: [0.8, 1],
      opacity: [0, 1],
      rotate: [-10, 0],
      duration: 800,
    }, '-=400')
    .add({
      targets: '.inputTodo-list, #todo-button, .cancel',
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
    }, '-=600');
}

function hidePopup(e) {
  anime.timeline({
    duration: 600,
    easing: 'easeInOutQuad'
  })
    .add({
      targets: '.inputTodo-list, #todo-button, .cancel',
      translateX: [0, 30],
      opacity: [1, 0],
      delay: anime.stagger(50, { direction: 'reverse' }),
      duration: 400,
    })
    .add({
      targets: '.menu',
      translateY: [0, 50],
      scale: [1, 0.8],
      opacity: [1, 0],
      rotate: [0, 10],
      duration: 500,
    }, '-=200')
    .add({
      targets: '.box-popup',
      backgroundColor: 'rgba(74, 98, 138, 0)',
      backdropFilter: ['blur(8px)', 'blur(0px)'],
      complete: () => {
        popupMenu.classList.replace("show-popup", "hide-popup");
        containerPopup.classList.add("hide");
      }
    }, '-=400');
}

function addButtonShine(button) {
  const shine = document.createElement('div');
  shine.style.position = 'absolute';
  shine.style.top = '0';
  shine.style.left = '0';
  shine.style.width = '100%';
  shine.style.height = '100%';
  shine.style.background = 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)';
  button.appendChild(shine);

  anime({
    targets: shine,
    translateX: ['0%', '100%'],
    easing: 'easeInOutSine',
    duration: 800,
    complete: () => shine.remove()
  });
}

function setupButtonHover() {
  const buttons = [addButton, cancelButton];
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      anime({
        targets: button,
        scale: 1.05,
        translateY: -5,
        duration: 300,
        easing: 'easeOutCubic'
      });
      addButtonShine(button);
    });

    button.addEventListener('mouseleave', () => {
      anime({
        targets: button,
        scale: 1,
        translateY: 0,
        duration: 300,
        easing: 'easeOutCubic'
      });
    });
  });
}

export function addingTodo() {

  const input = document.querySelector('.inputTodo-list');
  input.addEventListener('focus', () => {
    anime({
      targets: input,
      scale: 1.02,
      translateY: -4,
      duration: 300,
      easing: 'easeOutCubic'
    });
  });

  input.addEventListener('blur', () => {
    anime({
      targets: input,
      scale: 1,
      translateY: 0,
      duration: 300,
      easing: 'easeOutCubic'
    });
  });

  document.querySelector('.add-button').addEventListener('click', function (e) {
    const particles = 12;
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.setProperty('--angle', `${(i * 360 / particles)}deg`);

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      button.querySelector('.particles').appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 600);
    }

    if (!isShowPopup) {
      isShowPopup = true
      // popupMenu.classList.replace("hide-popup", "show-popup")
      // containerPopup.classList.remove("hide")
      showPopup(e)
    } else {
      isShowPopup = false
      hidePopup(e)
    }
  });
  cancelButton.addEventListener("click", hidePopup)
  setupButtonHover()
}
