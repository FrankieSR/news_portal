import parsePost from "./parsePost";
import { elems } from "./configs";

const Post = parsePost(
  "http://football.ua/ukraine/362045-upl-sbornaja-31-go-tura.html",
  elems.footballua
);

Post.then(data => console.log(data));
