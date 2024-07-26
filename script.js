//Canvas setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.screen.availWidth-10;
canvas.height = window.screen.availHeight-100;

//Variable setup.

let framerate, playerXPosition, playerYPosition, playerAngle, playerSpeed, playerDeltaX, playerDeltaY;

//Player data.
function draw2dPlayer() {
    //Draws the player box. 
    ctx.fillStyle = "#54aab3"
    ctx.fillRect(playerXPosition, playerYPosition, 10, 10);
    //Draws his directional line.
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "orange";
    ctx.moveTo(playerXPosition+5, playerYPosition+5);
    ctx.lineTo(playerXPosition+5 + playerDeltaX*10, playerYPosition+5 - playerDeltaY*10);
    ctx.stroke();

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
    //Clears the whole thing to be redrawn.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Draws the 2d portion.
    draw2dPlayer();
    //Draws the 3d portion.
}


//Game initialization.
function init() {
    framerate = 60;
    playerXPosition = 700;
    playerYPosition = 500;
    playerAngle = 0;
    playerSpeed = 200/framerate;
    //These variables are confusing, but these are like the length of the legs of the triangle made by the player's angle.
    playerDeltaX = Math.cos(playerAngle)*playerSpeed;
    playerDeltaY = Math.sin(playerAngle)*playerSpeed;
    document.addEventListener("keydown", handleKeyPress);
};

//Key presses.
function handleKeyPress(k) {
    console.log(k);
    console.log(k.key);
    //Turns CCW.
    if (k.key == "a") {
        playerAngle += .1;
        if (playerAngle >= 2*Math.PI) {
            playerAngle -= 2*Math.PI;
        } else if (playerAngle <= 2*Math.PI) {
            playerAngle -= 2*Math.PI;
        };
        playerDeltaX = Math.cos(playerAngle)*playerSpeed;
        playerDeltaY = Math.sin(playerAngle)*playerSpeed;
    //Turns CW.
    } else if (k.key == "d") {
        playerAngle -= .1;
        if (playerAngle >= 2*Math.PI) {
            playerAngle -= 2*Math.PI;
        } else if (playerAngle <= 2*Math.PI) {
            playerAngle -= 2*Math.PI;
        };
        playerDeltaX = Math.cos(playerAngle)*playerSpeed;
        playerDeltaY = Math.sin(playerAngle)*playerSpeed;
    //Moves backward.
    } else if (k.key == "s") {
        playerXPosition -= playerDeltaX;
        playerYPosition += playerDeltaY;
    //Moves forward.
    } else if (k.key == "w") {
        playerXPosition += playerDeltaX;
        playerYPosition -= playerDeltaY;
    };
};

//Main loop.
function main() {
    setInterval(displayFrame, 1000/framerate)
};






/*Tester Scripts go in here.
    //None currently.
*/

init();
main();