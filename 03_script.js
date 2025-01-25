console.log('External script is running!');

const map = L.map('map').setView([51.505, -0.09], 13); // Initialize Leaflet map

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Elements for gameplay
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
  console.log(`Key pressed: ${e.key}`);
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
  document.body.appendChild(zombie);
  zombies.push(zombie);
  console.log('Zombie spawned!');
}

setInterval(spawnZombie, 2000);
