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


