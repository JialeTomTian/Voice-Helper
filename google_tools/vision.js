const vision = require('@google-cloud/vision');
const difflib = require('difflib');
require('dotenv').config()

const detectImage = async (bufferData, imageWord) => {
  const client = new vision.ImageAnnotatorClient({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
  try {
    const result = await client.objectLocalization(
      {
        image: {
          content: bufferData
        }
      }
    );
    const annotations = result[0].localizedObjectAnnotations;
    for(let item of annotations){
      let similiarity = new difflib.SequenceMatcher(null, imageWord, item.name.toLowerCase());
      if(similiarity.ratio() > 0.75){
        return item.boundingPoly.normalizedVertices;
      }
    }
    throw Error("No Image Found")
  } catch (err) {
    throw err;
  }

}

module.exports = detectImage;