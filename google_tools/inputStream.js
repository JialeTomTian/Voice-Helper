const recorder = require('node-record-lpcm16');

const speech = require('@google-cloud/speech');
require('dotenv').config()

const encoding = 'LINEAR16'
const sampleRateHertz = 16000
const languageCode = 'en-US'

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const request = {
  config
};


// Creates an input stream for handling input
const inputStream = () => {
  const client = new speech.SpeechClient({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });

  // Create a recognize stream
  const recognizeStream = client
    .streamingRecognize(request)

  recorder
    .record({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, 
      recordProgram: 'rec', 
      silence: '5.0',
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');

  return recognizeStream;
}

module.exports = inputStream;