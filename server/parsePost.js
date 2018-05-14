const unirest = require('unirest');
const cheerio = require('cheerio');

function parsePost(url, elems) {
  unirest.get(url).end(function(response) {
    const body = response.body;
    // console.log(body);
    const $ = cheerio.load(body);
    const title = $(elems.title).text().trim();
    let image = $(elems.image).attr('src');
    const text = $(elems.text).text();


    const post = {
      title: title,
      image: image,
      text: text
    }

    console.log(post);
  });
}

module.exports = parsePost;
