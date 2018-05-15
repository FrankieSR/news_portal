import unirest from 'unirest';
import cheerio from 'cheerio';

async function parsePost(url, elems) {
  await unirest.get(url).end(({body}) => {

    const $ = cheerio.load(body);
    const title = $(elems.title).text().trim();
    let image = $(elems.image).attr('src');
    const text = $(elems.text).text();


    const post = {
      title: title,
      image: image,
      text: text
    };

  });
}

module.exports = parsePost;
