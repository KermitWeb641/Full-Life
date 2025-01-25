console.log('External script.js is loaded and running!');

const map = document.getElementById('map');
const player = document.getElementById('player');
const healthBar = document.getElementById('health-bar');
const timer = document.getElementById('timer');

let playerHealth = 100;
let survivalTime = 0;
let zombies = [];
const playerSpeed = 10;

// Initialize survival timer
setInterval(() => {
  survivalTime++;
  timer.textContent = `Survival Time: ${survivalTime}s`;
}, 1000);

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  console.log(`Key pressed: ${e.key}`); // Debugging log
  const rect = player.getBoundingClientRect();
  switch (e.key) {
    case 'ArrowUp':
      if (rect.top > 0) player.style.top = `${rect.top - playerSpeed}px`;
      break;
    case 'ArrowDown':
      if (rect.bottom < window.innerHeight) player.style.top = `${rect.top + playerSpeed}px`;
      break;
    case 'ArrowLeft':
      if (rect.left > 0) player.style.left = `${rect.left - playerSpeed}px`;
      break;
    case 'ArrowRight':
      if (rect.right < window.innerWidth) player.style.left = `${rect.left + playerSpeed}px`;
      break;
  }
});

// Spawn zombies
function spawnZombie() {
  const zombie = document.createElement('div');
  zombie.classList.add('zombie');
  zombie.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  zombie.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  map.appendChild(zombie);
  zombies.push(zombie);
  console.log('Zombie spawned!'); // Debugging log
}

setInterval(spawnZombie, 2000);
