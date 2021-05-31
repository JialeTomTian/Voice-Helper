# Voice Helper
Voice helper is a tool that helps you control you computer with just your voice

Technologies Used for This Project: Node.js, Google Vision, Google Speech, Robotjs

## Implementation Highlights
- Enable mouse control
- Enable hotkey control
- Enable movement to 4 default locations on computer screen
- Enable real time command through microphone input speech
- Enable screen shot capture and image detection
- Enable navigation to specific location on screen based on object name

## Implementation Details
The project is made using Nodejs. The commands through Robot.js are divided into two groups, basic commands and hot key commands. Hot key commands are accessed through string attributes which allows for easier detection of these commands.

Since users may come from a variety of backgrounds and Google Speech to Text is in no way perferct. Difflib is used to match the word detected to the closest command. For image object recognition on the screen, a 0.75 similarity ratio is used to find the closest image object.

## Future Implementation Additions
These are some additional features I want to include in the future for this project
- Allow more keyboard control
- Allow VIM like commands for voice control
- Find a solution for faster response time to location object on screen
