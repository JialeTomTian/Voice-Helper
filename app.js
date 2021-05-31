const inputStream = require("./google_tools/inputStream");
const ProcessData = require("./utilities/processData");

function main(){
  //Handling
  const commandProcessor = new ProcessData({ keyFilename: "file.json" });
  
  //Passing Microphone Stream Into Function
  const microphoneStream = inputStream();
  microphoneStream.on("data", data=>{
    commandProcessor.processCommands(data.results[0].alternatives[0].transcript)}
  );
}

main();