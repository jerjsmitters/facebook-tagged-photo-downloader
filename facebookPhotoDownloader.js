//---- STEPS TO TAKE BEFORE
// OPEN FACEBOOK, LOGIN, GO TO FIRST TAGGED PHOTO OF ALBUM


//---- INPUT PARAMS
const makeItHumanlike = false;
const isCalibrating = true; //don't save if we are calibrating
const totalPhotoCount = 2;
const delayBetweenSaves_ms = 2000;

//---- CALIBRATION -----//
const units = 20; //pixels

const taskbarChrome_x = 23 * units;

const toContextMenuSave_dx = 1 * units;
const toContextMenuSave_dy = 2 * units;

const toModalSaveButton_dx = 5 * units;
const toModalSaveButton_dy = 5 * units;


//while loop, while x < (number of photos)
const robot = require("robotjs");
const screenDimensions = robot.getScreenSize();

function moveMouseAbsolute(x, y){
    makeItHumanlike ? robot.moveMouseSmooth(x, y, 1) : robot.moveMouse(x, y);
}

function moveMouseRelative(x, y){
    var currentPosition = robot.getMousePos();
    moveMouseAbsolute(currentPosition.x + x, currentPosition.y + y);
}

function savePhoto(){
    //photo is about in the middle
    moveMouseAbsolute(screenDimensions.width/2, screenDimensions.height/2);

    //right click
    robot.mouseClick("right");
    moveMouseRelative(toContextMenuSave_dx, toContextMenuSave_dy);
    robot.mouseClick();
    moveMouseRelative(toModalSaveButton_dx, toModalSaveButton_dy);

    if (isCalibrating){
        robot.keyTap("escape");
    }
    else{
        robot.mouseClick();
    }
}

function navigateToNext(){
    robot.keyTap("right")
}


//---- BEGIN SCRIPT ----//

async function Program(){
    //let's open chrome
    const taskbarChrome_y = screenDimensions.height - 1* units; // taskbar y is slightly above bot of screen
    robot.moveMouse(taskbarChrome_x, taskbarChrome_y);
    robot.mouseClick();

    let counter = 0;
    while (counter < totalPhotoCount){
        savePhoto();
        navigateToNext();
        await new Promise(resolve => setTimeout(resolve, delayBetweenSaves_ms));
        counter++;
    }
}

Program();






