const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
const boxSize = 20; // Size of each segment
let snake = [{ x: 200, y: 200 }]; // Initial snake position
let direction = { x: 1, y: 0 }; // Start moving to the right
let food = getRandomPosition(); // Generate first food
let score = 0;

// Event listeners for keyboard and buttons
document.addEventListener('keydown', changeDirection);
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

// Start the game loop
let game = setInterval(drawGame, 200); // Set interval for movement

function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = '#59249e'; // Snake color
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = '#e0f7fa'; // Segment border
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Move the snake by creating a new head
    const head = { 
        x: snake[0].x + direction.x * boxSize, 
        y: snake[0].y + direction.y * boxSize 
    };
    snake.unshift(head); // Add new head

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = getRandomPosition(); // Generate new food
        score++;
    } else {
        snake.pop(); // Remove the last segment if no food is eaten
    }

    // Check for collisions with walls or itself
    if (checkCollision(head)) {
        clearInterval(game); // Stop the game
        alert(`Game Over! Your Score: ${score}`);
        resetGame(); // Reset game after collision
    }
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && direction.y !== 1) setDirection(0, -1);
    if (key === 'ArrowLeft' && direction.x !== 1) setDirection(-1, 0);
    if (key === 'ArrowDown' && direction.y !== -1) setDirection(0, 1);
    if (key === 'ArrowRight' && direction.x !== -1) setDirection(1, 0);
}

function setDirection(x, y) {
    // Prevent the snake from reversing
    if (x !== -direction.x || y !== -direction.y) {
        direction = { x, y };
    }
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x, y };
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 1, y: 0 }; // Start moving to the right
    food = getRandomPosition();
    score = 0;
    game = setInterval(drawGame, 200); // Restart game loop
}
