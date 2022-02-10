const glob = require('glob');
const fs = require('fs');
const zlib = require('zlib');

// circuluar fix
function JsonCircularCB() {
  // https://careerkarma.com/blog/converting-circular-structure-to-json/

  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
}

function generateFile(src, data, setDate = true) {
  const date = Date.now();

  // TODO: consider using path?
  // https://nodejs.org/api/path.html

  // TODO: check if there's a slash in it?
  const directoryOnly = src.substr(0, src.lastIndexOf("/"));
  const filenameOnly = src.substring(src.lastIndexOf("/") + 1);

  // modify filename with date
  let fileName = setDate
    ? `${filenameOnly.split(".")[0]}-${date}.${filenameOnly.split(".")[1]}`
    : filenameOnly;

  fs.writeFileSync(`${directoryOnly}/${fileName}`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function getFilesFromPath(path, extension) {
// https://stackoverflow.com/a/52024318/4096078
// https://stackoverflow.com/a/60604686/4096078

  return glob.sync(`${path}/**/*.${extension}`);
}

function decompress(fileIn, fileOut) {
  // https://pinoyitsolution.com/2019/05/22/how-to-unzip-multiple-gz-files-using-nodejs-and-zlib-on-windows-10/
  const unzip = zlib.createUnzip();

  const input = fs.createReadStream(fileIn);
  const output = fs.createWriteStream(fileOut);

  input.pipe(unzip).pipe(output);
}




module.exports = {
    JsonCircularCB,
    generateFile, 
    getFilesFromPath, 
    decompress
}