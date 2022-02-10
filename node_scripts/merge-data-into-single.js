const jsonMerger = require("json-merger");
const glob = require('glob');
const fs = require('fs')
const date = require('date-and-time');
const { getFilesFromPath, generateFile } = require("./utilities");

// 1 - get entire directory of files
// TODO: This is used in the other file
// function getFilesFromPath(path, extension) {
//   return glob.sync(`${path}/**/*.${extension}`);
// }

// TODO: This is used in the other file but could use some modifications
// function generateFile(fileName, data) {
//   const date = Date.now()

//   // slip
//   const fileNameTitle = fileName.split('.')[0]
//   const fileType = fileName.split('.')[1]

//   fs.writeFileSync(
//     `./cheerio_data/${fileNameTitle}-${date}.${fileType}`,
//     data,
//     (err) => {
//       if (err) {
//         console.error(err)
//         return
//       }
//     }
//   )
// }

const directory = getFilesFromPath('cheerio_data/unzip', 'json')
// console.log(directory)

// 2 - turn the filename into the object key
let object = {}

directory.forEach(item => {

    object[item] = {
      $import: item
    }
})

const result = jsonMerger.mergeObject(object);

// create a backup and the original
generateFile('./public/data-backup.json',  JSON.stringify(result));
generateFile('./public/data.json',  JSON.stringify(result), false);