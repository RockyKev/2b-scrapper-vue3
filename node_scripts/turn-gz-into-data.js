// this script takes the aws gz file and creates a js object out of it.

const zlib = require('zlib');
const fs = require('fs');
const glob = require('glob');

// https://pinoyitsolution.com/2019/05/22/how-to-unzip-multiple-gz-files-using-nodejs-and-zlib-on-windows-10/
function decompress(fileIn, fileOut) {

  const unzip = zlib.createUnzip();

  const input = fs.createReadStream(fileIn);
  const output = fs.createWriteStream(fileOut);

  input.pipe(unzip).pipe(output);
}

// https://stackoverflow.com/a/52024318/4096078
// https://stackoverflow.com/a/60604686/4096078
function getFilesFromPath(path, extension) {
  return glob.sync(`${path}/**/*.${extension}`);
}


function extractAllGZipFiles(array, location) {

  console.log("location - array", array)

  array.forEach(item => {

    // POOR MAN's text filtering
    const newName = item.slice(28);
    console.log("location", location)
    console.log("newName", newName)

    // TODO: figure out how to move them all to the same file
    decompress(item, `${location}/${newName}.json`)

  })

}


const dataPath = "./cheerio_data/aws/";
const endLocation = "./cheerio_data/unzip"; // THIS DIRECTORY NEEDS TO EXIST FIRST

// make the folder
// https://nodejs.dev/learn/working-with-folders-in-nodejs
try {
  if (!fs.existsSync(endLocation)) {
    fs.mkdirSync(endLocation)
  }
} catch (err) {
  console.error(err)
}

const files = getFilesFromPath(dataPath, "gz");

extractAllGZipFiles(files, endLocation);


