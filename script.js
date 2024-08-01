//Preinitialization.
//////////////////////////////////////////////////////////////////

//Canvas setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 900;

//Variable setup.
let framerate, playerXPosition, playerYPosition, playerAngle, playerSpeed, playerDeltaX, playerDeltaY, currentMap, map2dScaler;
let aPressed, dPressed, sPressed, wPressed = false;

//Game map.
const mapArray1 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

//Various functional functions.
//////////////////////////////////////////////////////////////////

//Key presses.
function handleKeyPress(k) {
    if (k.key == "a") {
        aPressed = true;
    } else if (k.key == "d") {
        dPressed = true;
    } else if (k.key == "s") {
        sPressed = true;
    } else if (k.key == "w") {
        wPressed = true;
    };
};

function handleKeyUp(k) {
    if (k.key == "a") {
        aPressed = false;
    } else if (k.key == "d") {
        dPressed = false;
    } else if (k.key == "s") {
        sPressed = false;
    } else if (k.key == "w") {
        wPressed = false;
    };
};

function playerMove() {
    //Turns CCW.
    if (aPressed) {
        playerAngle += .05;
        if (playerAngle <= 0) {
            playerAngle += 2 * Math.PI;
        } else if (playerAngle >= 2 * Math.PI) {
            playerAngle -= 2 * Math.PI;
        };
        playerDeltaX = Math.cos(playerAngle);
        playerDeltaY = Math.sin(playerAngle);
    };
    //Turns CW.
    if (dPressed) {
        playerAngle -= .05;
        if (playerAngle <= 0) {
            playerAngle += 2 * Math.PI;
        } else if (playerAngle >= 2 * Math.PI) {
            playerAngle -= 2*Math.PI;
        };
        playerDeltaX = Math.cos(playerAngle);
        playerDeltaY = Math.sin(playerAngle);
    };
    //Moves forward.
    if (wPressed) {
        playerXPosition += playerDeltaX * playerSpeed;
        playerYPosition -= playerDeltaY * playerSpeed;
    };
    //Moves backward.
    if (sPressed) {
        playerXPosition -= playerDeltaX * playerSpeed;
        playerYPosition += playerDeltaY * playerSpeed;
    };
};

//2d Rendering.
//////////////////////////////////////////////////////////////////

//Player data.
function draw2dPlayer() {
    //Draws the player box. 
    ctx.fillStyle = "#54aab3"
    ctx.fillRect(playerXPosition * map2dScaler, playerYPosition * map2dScaler, 6 * map2dScaler, 6 * map2dScaler);
    //Draws his directional line.
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "orange";
    ctx.moveTo((playerXPosition + 3) * map2dScaler, (playerYPosition + 3) * map2dScaler);
    ctx.lineTo((playerXPosition + 3 + playerDeltaX * 64) * map2dScaler, (playerYPosition + 3 - playerDeltaY * 64) * map2dScaler);
    ctx.stroke();
};

//Draws map for the 2d side.
//Assumes this is a square. If it's not, unknown result.
//Like the genius I am, the first array I pass through this is not a square. Worked perfectly tho.
function draw2dMap(mapArray) {
    let currentRow = 0;
    let currentBlock = 0;
    for (let i of mapArray) {
        for (let j of i) {
            if (j == 1) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(64*currentBlock*map2dScaler,64*currentRow*map2dScaler,64*map2dScaler,64*map2dScaler);
            } else if (j == 0) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(64*currentBlock*map2dScaler,64*currentRow*map2dScaler,64*map2dScaler,64*map2dScaler);
            };
            currentBlock++
        };
        currentBlock = 0;
        currentRow++;
    };
};

//3d Rendering.
//////////////////////////////////////////////////////////////////

function drawRays(mapArray) {

    let rayNumber, depthOfField, rayXPosition, rayYPosition, rayAngle, rayXOffset, rayYOffset, mapPosition, mapXPosition, mapYPosition;

    rayAngle = playerAngle;

    for (rayNumber=0; rayNumber < 1; rayNumber++) {

        depthOfField = 0;
        rayYPosition = rayAngle < Math.PI ? (Math.trunc(playerYPosition / 64) * 64) : (Math.trunc(playerYPosition / 64 + 1) * 64);
        rayXPosition = rayAngle < Math.PI ? (playerYPosition - rayYPosition) / Math.tan(rayAngle) + playerXPosition : (playerYPosition - rayYPosition) / Math.tan(rayAngle) + playerXPosition;
        rayYOffset = rayAngle < Math.PI ? -64 : 64;
        rayXOffset =  rayAngle < Math.PI ? 64 / Math.tan(rayAngle) : -64 / Math.tan(rayAngle);

        while (depthOfField < 6) {
            mapYPosition = rayAngle < Math.PI ? Math.trunc(rayYPosition / 64 + .01) : Math.trunc(rayYPosition / 64 + .01);
            mapXPosition = Math.trunc((rayXPosition) / 64);
            
            if (mapArray[mapYPosition][mapXPosition] != undefined) {
                if (mapArray[mapYPosition][mapXPosition] == 1) {
                    break;
                } else {
                    depthOfField++;
                    rayXPosition += rayXOffset;
                    rayYPosition += rayYOffset;
                };
                } else {break;};
                //I need to make it dump negative x values.
        };

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.moveTo((playerXPosition + 3) * map2dScaler, (playerYPosition + 3) * map2dScaler);
        ctx.lineTo((rayAngle < Math.PI ? rayXPosition - rayXOffset : rayXPosition) * map2dScaler, (rayAngle < Math.PI ? rayYPosition - rayYOffset : rayYPosition) * map2dScaler);
        ctx.stroke();
    };

};

//Main functions.
//////////////////////////////////////////////////////////////////

//Main loop.
function main() {
    setInterval(displayFrame, 1000/framerate)
};

//Game initialization.
//If there's some variable that needs to be smth when everything starts, it's probably going to be here.
function init() {
    framerate = 60;
    playerXPosition = 512;
    playerYPosition = 512;
    playerAngle = 0; //In radians.
    playerSpeed = 50/framerate;
    //These 2 variables are confusing, but these are like the length of the legs of the right triangle made by the player's angle.
    playerDeltaX = Math.cos(playerAngle)*playerSpeed;
    playerDeltaY = Math.sin(playerAngle)*playerSpeed;
    map2dScaler = .4; //Change this to change the size of the 2d map without breaking everything else.
    currentMap = mapArray1; //There's only 1 rn but I could add another and then switch between maps/levels.
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
};

//2d and 3d renderer. This is what get looped by main, happens every frame.
function displayFrame() {
    //Clears the whole thing to be redrawn.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draws the 3d portion.
    
    //Draws the 2d portion.
    draw2dMap(currentMap);
    playerMove();
    drawRays(currentMap);
    draw2dPlayer();
    

};

init();
main();