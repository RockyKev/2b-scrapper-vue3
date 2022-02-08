const jsonMerger = require("json-merger");
const glob = require('glob');
const fs = require('fs')
const date = require('date-and-time');

const file1 = './cheerio_data/unzip/2022-02-07-03-39-35-6d86be8e7f65d9d9816f27f533b7a9883dcef46af5275cc53586d7228b625f09.gz.json';
const file2 = './cheerio_data/unzip/2022-02-07-17-47-35-1a50a7dc8c6cc2783339df02e241d3f25b3817d0f9fdab032af7ebeafa647fb5.gz.json';



// const result = jsonMerger.mergeFiles([file1, file2], {
//   defaultArrayMergeOperation: "concat"
// });

// let object = {
//   "first": {
//     $import: file1
//   },
//   "second": {
//     $import: file2
//   }
// }

// 1 - get entire directory of files
// TODO: This is used in the other file
function getFilesFromPath(path, extension) {
  return glob.sync(`${path}/**/*.${extension}`);
}

// TODO: This is used in the other file but could use some modifications
function generateFile(fileName, data) {
  const date = Date.now()

  // slip
  const fileNameTitle = fileName.split('.')[0]
  const fileType = fileName.split('.')[1]

  fs.writeFileSync(
    `./cheerio_data/${fileNameTitle}-${date}.${fileType}`,
    data,
    (err) => {
      if (err) {
        console.error(err)
        return
      }
    }
  )
}



const directory = getFilesFromPath('cheerio_data/unzip', 'json')
console.log(directory)

// 2 - turn the filename into the object key
let object = {}

directory.forEach(item => {

    object[item] = {
      $import: item
    }
})

const result = jsonMerger.mergeObject(object);

// console.log(result);
generateFile('combined.json',  JSON.stringify(result));
