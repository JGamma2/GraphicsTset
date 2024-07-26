//Canvas setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.screen.availWidth-10;
canvas.height = window.screen.availHeight-100;

//Variable setup.
let framerate, playerXPosition, playerYPosition, playerAngle, playerSpeed, playerDeltaX, playerDeltaY, currentMap;

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

//Draws map for the 2d side.
//Assumes this is a square. If it's not, unknown result.
//Like the genius I am, the first array I pass through this is not a square. Worked perfectly tho.
//Eventually will be phased out for full 3d, but currently required for visualization.
function draw2dMap(mapArray) {
    let currentRow = 0;
    let currentBlock = 0;
    for (let i of mapArray) {
        for (let j of i) {
            if (j == 1) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(50*currentBlock,50*currentRow,50,50);
            } else if (j == 0) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(50*currentBlock,50*currentRow,50,50);
            };
            currentBlock++
        };
        currentBlock = 0;
        currentRow++;
    };
};

//Game map.
const mapArray1 = [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
];

//Key presses.
function handleKeyPress(k) {
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

//Game initialization.
function init() {
    framerate = 60;
    playerXPosition = 700;
    playerYPosition = 500;
    playerAngle = 0; //In radians.
    playerSpeed = 200/framerate;
    //These variables are confusing, but these are like the length of the legs of the triangle made by the player's angle.
    playerDeltaX = Math.cos(playerAngle)*playerSpeed;
    playerDeltaY = Math.sin(playerAngle)*playerSpeed;
    currentMap = mapArray1;
    document.addEventListener("keydown", handleKeyPress);
};

//2d and 3d renderer.
function displayFrame() {
    //Clears the whole thing to be redrawn.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Draws the 2d portion.
    draw2dMap(currentMap);
    draw2dPlayer();
    //Draws the 3d portion.

};


/*Tester Scripts go in here.
    //None currently.
*/

init();
main();