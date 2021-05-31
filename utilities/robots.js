const robot = require("robotjs");

const screenSize = robot.getScreenSize();
const visionTool = require("../google/vision");
const screenshot = require('screenshot-desktop');
const detectImage = require("../google/vision");

const hMoveLarge = screenSize.height / 2;
const hMoveMedium = screenSize.height / 4;
const hMoveSmall = screenSize.height / 8;

const wMoveLarge = screenSize.height / 2;
const wMoveMedium = screenSize.height / 4;
const wMoveSmall = screenSize.height / 8;


const robotCommands = {
  typeKeyBoard: (input) => {
    robot.typeString(input)
  },

  getPosition: () => {
    return robot.getMousePos();
  },

  moveLeft: (size) => {
    const mouse = robot.getMousePos();
    if (size === "large") {
      robot.moveMouseSmooth(mouse.x - wMoveLarge, mouse.y)
    } else if (size == "small") {
      robot.moveMouseSmooth(mouse.x - wMoveSmall, mouse.y)
    } else {
      robot.moveMouseSmooth(mouse.x - wMoveMedium, mouse.y);
    }
  },

  moveRight: (size) => {
    const mouse = robot.getMousePos();
    if (size === "large") {
      robot.moveMouseSmooth(mouse.x + wMoveLarge, mouse.y)
    } else if (size == "small") {
      robot.moveMouseSmooth(mouse.x + wMoveSmall, mouse.y)
    } else {
      robot.moveMouseSmooth(mouse.x + wMoveMedium, mouse.y);
    }
  },

  moveUp: (size) => {
    const mouse = robot.getMousePos();
    if (size === "large") {
      robot.moveMouseSmooth(mouse.x, Math.max(mouse.y - hMoveLarge, 0)) //Possible issue with robot.js package?
    } else if (size == "small") {
      robot.moveMouseSmooth(mouse.x, Math.max(mouse.y - hMoveSmall, 0))
    } else {
      robot.moveMouseSmooth(mouse.x, Math.max(mouse.y - hMoveMedium, 0));
    }
  },

  moveDown: (size) => {
    const mouse = robot.getMousePos();
    if (size === "large") {
      robot.moveMouseSmooth(mouse.x, mouse.y + hMoveLarge)
    } else if (size == "small") {
      robot.moveMouseSmooth(mouse.x, mouse.y + hMoveSmall)
    } else {
      robot.moveMouseSmooth(mouse.x, mouse.y + hMoveMedium);
    }
  },

  mouseClick: (position) => {
    if (position == "left") {
      robot.mouseClick(["left"])
    } else {
      robot.mouseClick(["right"])
    }
  },

  mouseScrollUp: (size) => {
    if (size === "large") {
      robot.scrollMouse(mouse.x, mouse.y + 100)
    } else if (size == "small") {
      robot.scrollMouse(mouse.x, mouse.y + 25)
    } else {
      robot.scrollMouse(mouse.x, mouse.y + 50);
    }
  },

  mouseScrollDown: (size) => {
    if (size === "large") {
      robot.scrollMouse(mouse.x, mouse.y - 100)
    } else if (size == "small") {
      robot.scrollMouse(mouse.x, mouse.y - 25)
    } else {
      robot.scrollMouse(mouse.x, mouse.y - 50);
    }
  },

  searchImage: (command) => {
    command = command.split(" ");
    command = command[2]; //Using third key phrase
    screenshot().then(async (img) => {
      let coordinates = await detectImage(img,  command);
      let xCoordinate = (coordinates[0].x + coordinates[1].x)/2
      let yCoordinate = (coordinates[0].y + coordinates[2].y)/2
      robot.moveMouseSmooth(screenSize.width * xCoordinate, screenSize.height * yCoordinate);
    }).catch((err) => {
      console.log(err.message);
    })
  }
}

module.exports = robotCommands;