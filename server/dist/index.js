"use strict";

var _parsePost = require("./parsePost");

var _parsePost2 = _interopRequireDefault(_parsePost);

var _configs = require("./configs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = (0, _parsePost2.default)("http://football.ua/ukraine/362045-upl-sbornaja-31-go-tura.html", _configs.elems.footballua);

Post.then(function (data) {
  return console.log(data);
});