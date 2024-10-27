const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const boxSize = 20; // Size of the snake and food
const canvasSize = 400; // Size of the canvas
let snake = [{ x: 9 * boxSize, y: 9 * boxSize }]; // Initial snake position
let direction = { x: 0, y: 0 }; // Initial direction
let food = spawnFood();
let gameInterval;

// Draw the game elements
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear canvas
    drawSnake();
    drawFood();
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = '#1e90ff'; // Snake color
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#ff4500'; // Food color
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Spawn food at random position
function spawnFood() {
    const x = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    return { x, y };
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        food = spawnFood(); // Spawn new food
    } else {
        snake.unshift(head);
        snake.pop(); // Remove the tail
    }

    // Check for collision with walls or itself
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Refresh to play again.');
    }
}

// Check for self-collision
function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Set the direction based on button clicks
function setDirection(newDirection) {
    if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
        direction = newDirection;
    }
}

// Start the game
function startGame() {
    clearInterval(gameInterval); // Clear any existing intervals
    snake = [{ x: 9 * boxSize, y: 9 * boxSize }]; // Reset snake position
    direction = { x: 0, y: 0 }; // Reset direction
    food = spawnFood(); // Reset food position
    gameInterval = setInterval(() => {
        moveSnake();
        draw();
    }, 150); // Game speed
}

// Add event listeners for button clicks
document.getElementById('upButton').addEventListener('click', () => setDirection({ x: 0, y: -1 }));
document.getElementById('downButton').addEventListener('click', () => setDirection({ x: 0, y: 1 }));
document.getElementById('leftButton').addEventListener('click', () => setDirection({ x: -1, y: 0 }));
document.getElementById('rightButton').addEventListener('click', () => setDirection({ x: 1, y: 0 }));
document.getElementById('startButton').addEventListener('click', startGame);

// Add keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            setDirection({ x: 0, y: -1 });
            break;
        case 'ArrowDown':
            setDirection({ x: 0, y: 1 });
            break;
        case 'ArrowLeft':
            setDirection({ x: -1, y: 0 });
            break;
        case 'ArrowRight':
            setDirection({ x: 1, y: 0 });
            break;
    }
});

// Initial draw
draw();
