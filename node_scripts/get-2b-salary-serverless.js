// This is formatted per pipedream.com's formatting
// https://pipedream.com/@dylburger/scrape-a-website-on-a-schedule-store-to-s3-p_7NCVey/readme

async (event, steps) => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const date = require("date-and-time");

  async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  function cleanTheData($) {
    let returnData = [];

    $(".positions-upper")
      .children()
      .each(function (index) {
        if ($(this).prop("tagName").toLowerCase() === "article") {
          const h3 = $(this).find("h3");
          const $title = h3.contents().not(h3.children()).text();
          const $salary = h3.contents().text();

          const cleanTitle = $title
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/\s+/g, " ")
            .trim();
          const cleanSalary = $salary
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(function (item) {
              return item.match(/^\$/);
            });

          // cleaned up version
          const obj = {
            title: cleanTitle,
            salary: cleanSalary,
          };

          returnData[index] = obj;
        }
      });

    // delete empty nodes
    const timestamp = date.format(new Date(), "YYYY-MM-DD-HH-mm-ss");

    returnData = returnData.filter((a) => a);

    const finalReturn = {
      "timestamp:": Date.now(),
      "readable-timestamp": timestamp,
      salaries: returnData,
    };
    return JSON.stringify(finalReturn);
  }

  const $ = await fetchHTML("https://www.twobarrels.com/jobs/");

  // Save the HTML in the $event object, which allows you to
  // store data in one step and use it in another. See
  // https://docs.pipedream.com/notebook/dollar-event/#modifying-event
  // this.html = $.html()

  this.deliveryPayload = cleanTheData($);
};
