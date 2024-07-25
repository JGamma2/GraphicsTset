//Canvas setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.screen.availWidth-10;
canvas.height = window.screen.availHeight-100;

//Player data.
let playerXPosition, playerYPosition;
function drawPlayer() {   
    ctx.fillStyle = "#54aab3"
    ctx.fillRect(playerXPosition, playerYPosition, 10, 10);
};

//Game map.
const mapArray = [
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,
];

//2d Renderer.
function displayFrame() {
    drawPlayer();

}


//Game initialization.
function init() {
    playerXPosition = 700;
    playerYPosition = 500;
    document.addEventListener("keydown", handleKeyPress)
};

//Key presses.
function handleKeyPress(k) {
    return 0;
}








/*Tester Scripts go in here.

*/

init();
displayFrame();