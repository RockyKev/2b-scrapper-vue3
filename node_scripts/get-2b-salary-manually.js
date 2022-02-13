// NOTE: This is now being done by the API software online https://pipedream.com/workflows

const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')
const fs = require('fs')
const date = require('date-and-time');

// TODO: does this work?
const JsonCircularCB = require('utilities.js').JsonCircularCB;


const url = 'https://www.twobarrels.com/jobs/'

// Poor man's debug. This is to test and clean data without fetching.
const GO_ONLINE = false;

if (GO_ONLINE) {
  axios.get(url).then(
    (response) => {
      if (response.status === 200) {
        const html = response.data
        const $ = cheerio.load(html)

          generateFile('./cheerio_data/2B-live.json', cleanTheData($))

        // To generate the file without clean data
        // generateFile('./cheerio_data/test.html', $.html);
      }
    },
    (error) => console.log(error)
  )
} else {
  // How to test it manually 
  console.log('fetching file')

  // Open the file locally
  const src = './cheerio_data/test-1644194750203.html'
  const fileOpened = require('fs').readFileSync(src, 'utf8')

  // get the text file
  const $ = cheerio.load(fileOpened)

  generateFile('./cheerio_data/2B.json', cleanTheData($))
}

// This function will always be custom written for the website
function cleanTheData($) {
  console.log("im in cleanTheData and we're ONLINE:", GO_ONLINE)

  let returnData = []

  $('.positions-upper')
    .children()
    .each(function (index) {
      if ($(this).prop('tagName').toLowerCase() === 'article') {
        const h3 = $(this).find('h3')
        const $title = h3.contents().not(h3.children()).text()
        const $salary = h3.contents().text()

        const cleanTitle = $title
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim()
        const cleanSalary = $salary
          .replace(/(\r\n|\n|\r)/gm, '')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .filter(function (item) {
            return item.match(/^\$/)
          })

        // cleaned up version
        const obj = {
          title: cleanTitle,
          salary: cleanSalary,
        }

        returnData[index] = obj
      }
    })

  // delete empty nodes
  const timestamp = date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss');

  returnData = returnData.filter((a) => a);

  const finalReturn = {
    "timestamp:" : Date.now(),
    "readable-timestamp": timestamp,
    "salaries": returnData
  }
  return JSON.stringify(finalReturn, JsonCircularCB())
}
