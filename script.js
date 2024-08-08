//Preinitialization.
//////////////////////////////////////////////////////////////////

//Canvas setup.
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 900;

//Variable setup.
let framerate, playerXPosition, playerYPosition, playerAngle, playerSpeed, playerDeltaX, playerDeltaY, currentMap, map2dScaler, canGoForward, canGoBackward;
let aPressed, dPressed, sPressed, wPressed = false;

//Game map.
const mapArray1 = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1],
];
const mapArray2 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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

    //Checks if player can go forward.
    canGoForward = true;
    if (currentMap[Math.trunc((playerYPosition - playerDeltaY * playerSpeed) / 64)][Math.trunc((playerXPosition + playerDeltaX * playerSpeed) / 64)] == 1) {
        canGoForward = false;
    };

    //Checks if player can go backward.
    canGoBackward = true;
    if (currentMap[Math.trunc((playerYPosition + playerDeltaY * playerSpeed) / 64)][Math.trunc((playerXPosition - playerDeltaX * playerSpeed) / 64)] == 1) {
        canGoBackward = false;
    };

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
    if (wPressed && canGoForward == true) {
        playerXPosition += playerDeltaX * playerSpeed;
        playerYPosition -= playerDeltaY * playerSpeed;
    };

    //Moves backward.
    if (sPressed && canGoBackward == true) {
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
                ctx.fillRect(64 * currentBlock * map2dScaler, 64 * currentRow * map2dScaler, 64 * map2dScaler, 64 * map2dScaler);
            } else if (j == 0) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(64 * currentBlock * map2dScaler, 64* currentRow * map2dScaler, 64 * map2dScaler, 64 * map2dScaler);
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

    let rayNumber, depthOfField, rayXPositionH, rayYPositionH, rayAngle, rayXOffsetH, rayYOffsetH, mapXPosition, mapYPosition, takeVert, takeHori, rayXPositionV, rayYPositionV, rayXOffsetV, rayYOffsetV;


    for (rayNumber = 0; rayNumber < 240; rayNumber++) {

        rayAngle = playerAngle + Math.PI / 6 - rayNumber / 180 * Math.PI / 4;

        if (rayAngle > 2 * Math.PI) {
            rayAngle -= 2 * Math.PI;
        } else if (rayAngle < 0) {
            rayAngle += 2 * Math.PI;
        }
        
        takeHori = false;
        takeVert = false;

        //Checking horizontal grid lines.
        depthOfField = 0;
        rayYPositionH = rayAngle < Math.PI ? Math.trunc(playerYPosition / 64) * 64 : (Math.trunc(playerYPosition / 64 + 1) * 64);
        rayXPositionH = (playerYPosition - rayYPositionH) / Math.tan(rayAngle) + playerXPosition;
        rayYOffsetH = rayAngle < Math.PI ? -64 : 64;
        rayXOffsetH =  rayAngle < Math.PI ? 64 / Math.tan(rayAngle) : -64 / Math.tan(rayAngle);

        while (depthOfField < 20) {
            mapYPosition = Math.trunc(rayAngle < Math.PI ? rayYPositionH / 64 - .9999 : rayYPositionH / 64 + .0001);
            mapXPosition = Math.trunc(rayXPositionH / 64);
            
            if (mapArray[mapYPosition][mapXPosition] != undefined && rayAngle != 0 && rayAngle != Math.PI && mapXPosition >= 0) {
                if (mapArray[mapYPosition][mapXPosition] == 1) {
                    break;
                } else {
                    depthOfField++;
                    rayXPositionH += rayXOffsetH;
                    rayYPositionH += rayYOffsetH;
                };
                } else {
                    takeHori = false;
                    takeVert = true;
                    break;};
        };
        
        //Checking vertical grid lines.
        try {
        depthOfField = 0;
        rayXPositionV = rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? (Math.trunc(playerXPosition / 64) + 1) * 64 : (Math.trunc(playerXPosition / 64)) * 64;
        rayYPositionV = (playerXPosition - rayXPositionV) * Math.tan(rayAngle) + playerYPosition;
        rayXOffsetV = rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? 64 : -64;
        rayYOffsetV = rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? -Math.tan(rayAngle) * 64 : Math.tan(rayAngle) * 64;

        while (depthOfField < 20) {
            mapXPosition = Math.trunc(rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? rayXPositionV / 64 + .0001 : rayXPositionV / 64 -.9999);
            mapYPosition = Math.trunc(rayYPositionV / 64);

            if (mapArray[mapYPosition][mapXPosition] != undefined && rayAngle != Math.PI / 2 && rayAngle != 3 * Math.PI / 2 && mapXPosition >= 0) {
                if (mapArray[mapYPosition][mapXPosition] == 1) {
                    break;
                } else {
                    depthOfField++;
                    rayXPositionV += rayXOffsetV;
                    rayYPositionV += rayYOffsetV;
                };
                } else {
                    takeVert = false;
                    takeHori = true;
                    break;};
        }} catch {
            takeHori = true;
        };

        //Deciding if it should draw the horizontal or vertical check line.
        let vertDist = Math.sqrt((playerXPosition - rayXPositionV) ** 2 + (playerYPosition - rayYPositionV) ** 2);
        let horiDist = Math.sqrt((playerXPosition - rayXPositionH) ** 2 + (playerYPosition - rayYPositionH) ** 2);
        if (takeHori == true) {
            takeHori = true;
        } else if (takeVert == true) {
            takeVert = true;
        } else {

            if (vertDist < horiDist) {
                takeVert = true;
            } else {
                takeHori = true;
            };
        };

        //Draws the line.
        if (takeHori == true) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.moveTo((playerXPosition + 3) * map2dScaler, (playerYPosition + 3) * map2dScaler);
            ctx.lineTo((rayAngle < Math.PI ? rayXPositionH : rayXPositionH) * map2dScaler, (rayAngle < Math.PI ? rayYPositionH : rayYPositionH) * map2dScaler);
            ctx.stroke();
        } else if (takeVert == true) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.moveTo((playerXPosition + 3) * map2dScaler, (playerYPosition + 3) * map2dScaler);
            ctx.lineTo((rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? rayXPositionV : rayXPositionV) * map2dScaler, (rayAngle < Math.PI / 2 || rayAngle > 3 * Math.PI / 2 ? rayYPositionV /*- rayYOffsetV*/ : rayYPositionV) * map2dScaler);
            ctx.stroke();
        };
        if (takeHori == true) {
            draw3dRectangle(horiDist, rayNumber, rayAngle, "#122211"); 
        } else {
            draw3dRectangle(vertDist, rayNumber, rayAngle, "#223221");
        }

    };
};

function draw3dRectangle(distance, number, angle, color) {
    let rectangleHeight = canvas.height * 64 / distance / Math.cos(playerAngle - angle);
    ctx.fillStyle = color;
    ctx.fillRect(number * canvas.width / 240, canvas.height / 2 - canvas.height / distance * 16, canvas.width / 240, rectangleHeight);
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
    playerXPosition = 100;
    playerYPosition = 100;
    playerAngle = 0; //In radians.
    playerSpeed = 100 / framerate;
    //These 2 variables are confusing, but these are like the length of the legs of the right triangle made by the player's angle.
    playerDeltaX = Math.cos(playerAngle);
    playerDeltaY = Math.sin(playerAngle);
    map2dScaler = .2; //Change this to change the size of the 2d map without breaking everything else.
    currentMap = mapArray2; //Change this to switch levels.
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