const robot = require("robotjs")
const screenSize = robot.getScreenSize();


// Edit this file to configure your hot keys
const hotkeys = {
  "center" : () => {
    robot.moveMouseSmooth(screenSize.width/2, screenSize.height/2)
  },
  "top left corner" : () => {
    robot.moveMouseSmooth(screenSize.width/4, screenSize.height/4)
  },
  "bottom left corner" : () => {
    robot.moveMouseSmooth(screenSize.width/4, 3*screenSize.height/4)
  },
  "top right corner" : () => {
    robot.moveMouseSmooth(3*screenSize.width/4, screenSize.height/4)
  },
  "bottom right corner" : () => {
    robot.moveMouseSmooth(3*screenSize.width/4, 3*screenSize.height/4)
  },
  "open terminal" : () => {
    robot.keyToggle("control", "down");
    robot.keyToggle("alt", "down");
    robot.keyTap("t");
    robot.keyToggle("control", "up");
    robot.keyToggle("alt", "up");
  }, 
  "press enter" : () => {
    robot.keyTap("enter");
  },
  "close terminal": () => {
    robot.keyToggle("control", "down");
    robot.keyToggle("shift", "down");
    robot.keyTap("q");
    robot.keyToggle("control", "up");
    robot.keyToggle("shift", "up");
  }
}

module.exports = hotkeys;