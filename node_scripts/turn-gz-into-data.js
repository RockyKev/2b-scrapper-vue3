// this script takes the aws gz file and creates a js object out of it.
const fs = require('fs');
const { getFilesFromPath, decompress } = require("./utilities");

const dataPath = "./cheerio_data/aws/";
const endLocation = "./cheerio_data/unzip"; 


function extractAllGZipFiles(array, location) {

  console.log("location - array", array)

  array.forEach(item => {

    // TODO: This is very much hardcoded. Not a utility
    // POOR MAN's text filtering
    const newName = item.slice(28);
    console.log("location", location)
    console.log("newName", newName)

    // TODO: figure out how to move them all to the same file
    decompress(item, `${location}/${newName}.json`)

  })
}

// TODO: Add this to a 'create folder just in case' function
try {
  // https://nodejs.dev/learn/working-with-folders-in-nodejs
  if (!fs.existsSync(endLocation)) {
    fs.mkdirSync(endLocation)
  }
} catch (err) {
  console.error(err)
}

const files = getFilesFromPath(dataPath, "gz");

extractAllGZipFiles(files, endLocation);


