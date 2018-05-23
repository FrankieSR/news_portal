import unirest from "unirest";
import cheerio from "cheerio";
import { elems } from "./configs";

const log = (i, count, ms) => {
  return new Promise(r =>
    setTimeout(() => {
      console.log("Индекс: " + i + "; всего записей " + count);
      r();
    }, ms)
  );
};

function parsePost(url, elems) {
  return new Promise((resolve, reject) => {
    unirest.get(url).end(({ body, error }) => {
      if (error) reject(error);

      const $ = cheerio.load(body);
      const title = $(elems.title)
        .text()
        .trim();
      let image = $(elems.image).attr("src");
      const text = $(elems.text)
        .text()
        .trim();
      const path = $(elems.path).attr("href");

      const post = {
        title: title,
        image: image,
        text: text
      };
      resolve(post);
    });
  });
}

function parseLinks(url, className, maxLinks = 5) {
  return new Promise((resolve, reject) => {
    let links = [];

    unirest.get(url).end(({ body, error }) => {
      if (error) reject(error);

      const $ = cheerio.load(body);

      $(className).each((i, e) => {
        if (i + 1 <= maxLinks) links.push($(e).attr("href"));
      });
      resolve(links);
      if (!links.length) reject({ error: "empty" });
    });
  });
}

async function getPosts(links) {
  let posts = [];
  let count = links.length;

  for (let i = 0; i < count; i++) {
    const post = await parsePost(links[i], elems.uaFootball).then(post => post);
    posts.push(post);
    console.log(post);
    await log(i + 1, count, 2000);
  }

  return new Promise((resolve, reject) => {
    if (!posts.length) reject({ empty: "empty" });
    resolve(posts);
  });
}

export { parsePost, parseLinks, getPosts };
