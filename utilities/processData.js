const robotCommands = require("./robots");
const difflib = require('difflib');
const hotkeys = require('./hotkeys');

const multiWordCommandWords = [
  "move",
  "click",
  "scroll",
  "find",
  "small",
  "large",
  "left",
  "right",
  "up",
  "down"
]

class ProcessData {
  treatWord = (command) => {
    return command.trim().toLowerCase();
  }

  processHotKeys = (command) => {
    const checkString = this.treatWord(command);
    let result = difflib.getCloseMatches(checkString, Object.keys(hotkeys))[0];

    if (result !== undefined) {
      hotkeys[result]();
      return true;
    } else {
      return false;
    }
  }

  multiWordCommands = (processedCommand) => {
    if (processedCommand[0] === "move") {
      if (processedCommand[1] === "left") {
        robotCommands.moveLeft(processedCommand[2]);
      } else if (processedCommand[1] === "right") {
        robotCommands.moveRight(processedCommand[2]);
      } else if (processedCommand[1] === "up") {
        robotCommands.moveUp(processedCommand[2]);
      } else if (processedCommand[1] === "down") {
        robotCommands.moveDown(processedCommand[2]);
      } else {
        console.log("Incomplete command please try again")
      }
    } else if (processedCommand[0] === "click") {
      if (processedCommand[1] === "left") {
        robotCommands.mouseClick("left");
      } else if (processedCommand[1] === "right") {
        robotCommands.mouseClick("right");
      } else {
        console.log("Incomplete command please try again")
      }
    } else if (processedCommand[0] === "scroll") {
      if (processedCommand[1] === "up") {
        robotCommands.mouseScroll(processedCommand[2]);
      } else if (processedCommand[1] == "down") {
        robotCommands.mouseClick(processedCommand[2]);
      } else {
        console.log("Incomplete command please try again")
      }
    }
  }

  processString = (command) => {
    const output = [];
    const splitCommand = command.split(" ");
    for (let word of splitCommand) {
      let result = difflib.getCloseMatches(word, multiWordCommandWords);
      output.push(result[0]);
    }
    return output;
  }

  processCommands = (currentCommand) => {
    currentCommand = this.treatWord(currentCommand);
    if(currentCommand.includes("search") && currentCommand.includes("image")){
      robotCommands.searchImage(currentCommand);
      return;
    }
    if (this.processHotKeys(currentCommand)) {
      return;
    }
    let processedCommand = this.processString(currentCommand);
    if (processedCommand.includes(undefined)) {
      console.log("Please Try Another Again, Command Not Accepted")
    } else {
      this.multiWordCommands(processedCommand);
    }
  }
}

module.exports = ProcessData;