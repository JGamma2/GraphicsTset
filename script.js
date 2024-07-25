//Canvas Setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.screen.availWidth-10;
canvas.height = window.screen.availHeight-100;

//Player data.
let playerXPosition, playerYPosition;
function drawPlayer() {   
    ctx.fillStyle = "#543423"
    ctx.fillRect(playerXPosition, playerYPosition, 10, 10);
};

//Game initialization.
function init() {
    return 0
};








/*Tester Scripts go in here.

*/

playerXPosition = 100;
playerYPosition = 100;
drawPlayer();