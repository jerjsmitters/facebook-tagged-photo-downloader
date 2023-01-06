//---- STEPS TO TAKE BEFORE
// OPEN FACEBOOK, LOGIN, GO TO FIRST TAGGED PHOTO OF ALBUM


//---- INPUT PARAMS
const makeItHumanlike = false; //this doesnt seem to work (:
const isCalibrating = false; //don't save if we are calibrating
const totalPhotoCount = 30;

// --- SETUP CONSTS -----//
const robot = require("robotjs");
const screenDimensions = robot.getScreenSize();

//---- CALIBRATION CONSTS -----//
const units = 20; //pixels

const taskbarChrome_x = 23 * units;
const rightClick_x = screenDimensions.width/4;
const rightClick_y = screenDimensions.width/8;
const toContextMenuSave_dx = 1 * units;
const toContextMenuSave_dy = 2 * units;
const toModalSaveButton_dx = 22 * units;
const toModalSaveButton_dy = 15 * units;

const delayWaitForContextMenu_ms = 4000;
const delayBetweenSaves_ms = 5000; //we want it to be long enough that we can terminate the process if we need to (manually from cmd)
const delayWaitForSaveModal_ms = 4000;
const delayForPageToLoad_ms = 5000;


// ------ FNs ------ //
async function Program(){
    console.log(screenDimensions);
    //let's open chrome
    const taskbarChrome_y = screenDimensions.height - 1* units; // taskbar y is slightly above bot of screen
    robot.moveMouse(taskbarChrome_x, taskbarChrome_y);
    robot.mouseClick();

    let counter = 0;
    while (counter < totalPhotoCount){
        console.log(counter);
        await savePhoto();
        await WaitAsync(delayBetweenSaves_ms);
        navigateToNext();
        await WaitAsync(delayForPageToLoad_ms);
        
        counter++;
    }

}

async function savePhoto(){
    //photo is about in the middle
    moveMouseAbsolute(rightClick_x, rightClick_y);

    //right click
    robot.mouseClick("right");
    await WaitAsync(delayWaitForContextMenu_ms);

    moveMouseRelative(toContextMenuSave_dx, toContextMenuSave_dy);
    robot.mouseClick();
    moveMouseRelative(toModalSaveButton_dx, toModalSaveButton_dy);

    await WaitAsync(delayWaitForSaveModal_ms)

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

function moveMouseAbsolute(x, y){
    makeItHumanlike ? robot.moveMouseSmooth(x, y, 1) : robot.moveMouse(x, y);
}

function moveMouseRelative(x, y){
    var currentPosition = robot.getMousePos();
    moveMouseAbsolute(currentPosition.x + x, currentPosition.y + y);
}

async function WaitAsync(delayMs){
    await new Promise(resolve => setTimeout(resolve, delayMs));
}



//---- BEGIN SCRIPT ----//

Program();






