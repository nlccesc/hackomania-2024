const cheerio = require("cheerio");

async function extractContent(url){
    const response = await fetch(url);
    const data = await response.json();

    // load the fetch document
    const $ = cheerio.load(data.body);
    console.log($.html())

    // retrieve the inpit
    // const inputs = $("input");

    // console.timeLog

}
