const jsonMerger = require("json-merger");
const glob = require('glob');
const fs = require('fs')
const date = require('date-and-time');
const { getFilesFromPath, generateFile } = require("./utilities");

// 1 - get entire directory of files
const directory = getFilesFromPath('cheerio_data/unzip', 'json')

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