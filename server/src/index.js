import { parsePost, parseLinks, getPosts } from "./parsePost";
import fs from "fs";

const saveResult = json => {
  fs.writeFile("result.json", json, err => {
    if (err) console.log("not saved");
  });
};

const urlPage = "https://www.ua-football.com/ukrainian/high/";
parseLinks(urlPage, ".fbi", 3)
  .then(links => {
    getPosts(links)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
      .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
