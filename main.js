document.querySelector('.add-button').addEventListener('click', function (e) {
  // Create particles
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

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 600);
  }
});

function controlPopup() {
  const popup = document.getElementById('box-popup');
  popup.classList.toggle('show');
}
