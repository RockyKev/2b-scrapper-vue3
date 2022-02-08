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

const dataPath = "./cheerio_data/aws/02/07";
const endLocation = "./cheerio_data/unzip"; // THIS DIRECTORY NEEDS TO EXIST FIRST
const files = getFilesFromPath(dataPath, "gz");

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

extractAllGZipFiles(files, endLocation);


