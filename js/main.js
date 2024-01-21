//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


// player 
let playerHeight = 10;
let playerWidth = 80;
let playerVelocityX = 10;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
}

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // dit is om de board te tekenen

    // dit is om de player te tekenen
    context.fillStyle = "greenyellow";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
}

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //player
    context.fillStyle = "greenyellow";
    context.fillRect(player.x, player.y, player.width, player.height);

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.height, ball.width);

    // ball laten kaatsen
    if (ball.y <= 0) {
        // als ball boven zijde aanraakt
        ball.velocityY *= -1;
    }
    else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        // als ball de rechter of linker zijde aanraakt
        ball.velocityX *= -1;
    }
    else if (ball.y + ball.height >= boardHeight) {
        // als ball onder zijde aanraakt 
        // game over
    }
    //stuiter de bal van de spelerspeddel
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;   // draai de y-richting omhoog of omlaag
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;   // draai de x-richting naar links of rechts
    }
    

}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
    
}

function movePlayer(e) {

    if (e.code == "ArrowLeft") {
        //player.x -= player.velocityX;} 
        let nextPlayerX = player.x - player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }

    }
    else if (e.code == "ArrowRight") {
        //player.x += playerVelocityX}
        let nextPlayerX = player.x + player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }
  }
}
    
// ball
let ballHeight = 10;
let ballWidth = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball ={
    x : boardHeight/2,
    y : boardWidth/2,
    height : ballHeight,
    width : ballWidth,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY,
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's linker boven hoek bereikt de rechterbovenhoek van b niet
           a.x + a.width > b.x &&   //a's rechter boven hoek passeert de linkerbovenhoek van b
           a.y < b.y + b.height &&  //a's linker boven hoek bereikt de linkerbenedenhoek van b niet
           a.y + a.height > b.y;    //a's linker onder hoek passeert de linkerbovenhoek van b
}
function topCollision(ball, block) { //a is boven b (ball is boven block)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}
function bottomCollision(ball, block) { //a is boven b (ball is onder block)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}
function leftCollision(ball, block) { //a is links van b (ball is links van block)
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}
function rightCollision(ball, block) { //a is rechts van b (ball is rechts van block)
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

