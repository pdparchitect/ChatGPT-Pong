// Set the canvas dimensions
var canvasWidth = 480;
var canvasHeight = 360;

// Create the player and CPU paddles
var playerPaddleWidth = 10;
var playerPaddleHeight = 60;
var playerPaddleX = 0;
var playerPaddleY = (canvasHeight - playerPaddleHeight) / 2;

var cpuPaddleWidth = 10;
var cpuPaddleHeight = 60;
var cpuPaddleX = canvasWidth - cpuPaddleWidth;
var cpuPaddleY = (canvasHeight - cpuPaddleHeight) / 2;

// Create the ball
var ballRadius = 5;
var ballX = canvasWidth / 2;
var ballY = canvasHeight / 2;
var ballVX = 5;
var ballVY = 5;

// Keep track of the scores
var playerScore = 0;
var cpuScore = 0;

// Create the canvas element
var canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.border = '1px solid white';
document.body.appendChild(canvas);

// Get the drawing context
var ctx = canvas.getContext('2d');

// Define the Key object and its methods
var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

// Add event listeners for keyboard events
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

// Update the game state at regular intervals
setInterval(function() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Set the fill color to black
  ctx.fillStyle = 'black';

  // Draw a rectangle on the canvas with the black fill color
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Update the player and CPU paddles
  updatePlayerPaddle();
  updateCpuPaddle();

  // Update the ball
  // Update the ball
  updateBall();

  // Draw the player and CPU paddles
  drawPlayerPaddle();
  drawCpuPaddle();

  // Draw the ball
  drawBall();

  // Draw the scores
  drawScores();
  
  // Draw center line
  drawCenterLine();
}, 1000 / 60);

// Update the player paddle's position based on keyboard input
function updatePlayerPaddle() {
  if (Key.isDown(Key.UP)) {
    playerPaddleY -= 5;
  }
  if (Key.isDown(Key.DOWN)) {
    playerPaddleY += 5;
  }
  playerPaddleY = Math.max(0, Math.min(canvasHeight - playerPaddleHeight, playerPaddleY));
}

// Update the CPU paddle's position based on the ball's position and velocity
function updateCpuPaddle() {
  if (ballVX > 0) {
    // Use the lerp() function to gradually move the CPU's paddle towards the ball
    cpuPaddleY = lerp(cpuPaddleY, ballY, 0.1);
  }
  if (ballVX < 0 && ballVY != 0) {
    // Use the lerp() function to gradually move the CPU's paddle towards the ball
    cpuPaddleY
    cpuPaddleY = lerp(cpuPaddleY, ballY, 0.1);
  }
  cpuPaddleY = Math.max(0, Math.min(canvasHeight - cpuPaddleHeight, cpuPaddleY));
}

// Update the ball's position and velocity
function updateBall() {
  ballX += ballVX / 2;
  ballY += ballVY / 2;

  // Check if the ball hits the player paddle
  if (ballX <= playerPaddleX + playerPaddleWidth && ballY >= playerPaddleY && ballY <= playerPaddleY + playerPaddleHeight) {
    ballVX = -ballVX;
  }

  // Check if the ball hits the CPU paddle
  if (ballX >= cpuPaddleX && ballY >= cpuPaddleY && ballY <= cpuPaddleY + cpuPaddleHeight) {
    ballVX = -ballVX;
  }

  // Check if the ball hits the top or bottom edge of the canvas
  if (ballY <= 0 || ballY >= canvasHeight) {
    ballVY = -ballVY;
  }

  // Check if the ball hits the left or right edge of the canvas
  if (ballX <= 0) {
    cpuScore++;
    resetBall();
  }
  if (ballX >= canvasWidth) {
    playerScore++;
    resetBall();
  }
}

// Reset the ball to the center of the canvas
function resetBall() {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
}

// Draw the player paddle on the canvas
function drawPlayerPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(playerPaddleX, playerPaddleY, playerPaddleWidth, playerPaddleHeight);
}

// Draw the CPU paddle on the canvas
function drawCpuPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(cpuPaddleX, cpuPaddleY, cpuPaddleWidth, cpuPaddleHeight);
}

// Draw the ball on the canvas
function drawBall() {
  ctx.fillStyle = 'white';
  ctx.fillRect(ballX - ballRadius, ballY - ballRadius, ballRadius * 2, ballRadius * 2);
}

// Draw the scores on the canvas
function drawScores() {
  ctx.fillStyle = 'white';
  ctx.font = '16px "Press Start 2P"';

  // Set the text alignment and baseline to align the scores as desired
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Draw the scores in the top left corner of the left player's field, slightly offset from the corner
  ctx.fillText(playerScore, 10, 10);

  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';

  // Draw the scores in the top right corner of the right player's field, slightly offset from the corner
  ctx.fillText(cpuScore, canvasWidth - 10, 10);
}

// Calculate the linear interpolation between two values
function lerp(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
}

function drawCenterLine() {
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
}