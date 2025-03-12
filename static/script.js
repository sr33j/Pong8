const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2 };
let rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };

let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5 };

function drawPaddle(paddle) {
    context.fillStyle = 'white';
    context.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function movePaddle(paddle, dy) {
    paddle.y += dy;
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddleHeight > canvas.height) paddle.y = canvas.height - paddleHeight;
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.dy = -ball.dy;
    }
    
    if (ball.x - ballRadius < 0) {
        if (ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
            ball.dx = -ball.dx;
        } else {
            reset();
        }
    } else if (ball.x + ballRadius > canvas.width) {
        if (ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
            ball.dx = -ball.dx;
        } else {
            reset();
        }
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            movePaddle(rightPaddle, -10);
            break;
        case 'ArrowDown':
            movePaddle(rightPaddle, 10);
            break;
        case 'w':
            movePaddle(leftPaddle, -10);
            break;
        case 's':
            movePaddle(leftPaddle, 10);
            break;
    }
});

setInterval(update, 1000 / 60);