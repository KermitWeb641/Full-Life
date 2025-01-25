const map = document.getElementById('map');
const player = document.getElementById('player');
const healthBar = document.getElementById('health-bar');
const timer = document.getElementById('timer');

let playerHealth = 100; // Player's health
let survivalTime = 0; // Survival timer
let zombies = []; // Track all zombies on the map
const playerSpeed = 10; // Speed of player movement

// Initialize survival timer
setInterval(() => {
  survivalTime++;
  timer.textContent = `Survival Time: ${survivalTime}s`;
}, 1000);

// Listen for arrow key presses to move the player
document.addEventListener('keydown', (e) => {
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

// Generate zombies at random positions
function spawnZombie() {
  const zombie = document.createElement('div');
  zombie.classList.add('zombie');

  // Randomize zombie position
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  zombie.style.left = `${x}px`;
  zombie.style.top = `${y}px`;

  // Add zombie to the map and track it
  map.appendChild(zombie);
  zombies.push(zombie);

  // Make the zombie move towards the player
  const moveZombie = setInterval(() => {
    const zombieRect = zombie.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // Calculate direction towards the player
    const dx = playerRect.left - zombieRect.left;
    const dy = playerRect.top - zombieRect.top;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 2;

    zombie.style.left = `${zombieRect.left + (dx / distance) * speed}px`;
    zombie.style.top = `${zombieRect.top + (dy / distance) * speed}px`;

    // Check collision with player
    if (
      zombieRect.left < playerRect.right &&
      zombieRect.right > playerRect.left &&
      zombieRect.top < playerRect.bottom &&
      zombieRect.bottom > playerRect.top
    ) {
      // Reduce health and remove the zombie
      playerHealth -= 10;
      updateHealth();
      clearInterval(moveZombie);
      map.removeChild(zombie);
      zombies = zombies.filter((z) => z !== zombie);
    }
  }, 50);
}

// Update the health bar
function updateHealth() {
  healthBar.style.width = `${playerHealth}%`;
  if (playerHealth <= 0) {
    alert(`Game Over! You survived for ${survivalTime} seconds.`);
    location.reload(); // Reload the page to restart
  }
}

// Spawn zombies every 2 seconds
setInterval(spawnZombie, 2000);
