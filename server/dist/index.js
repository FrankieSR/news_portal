"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require("./parsePost");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveResult = function saveResult(json) {
  _fs2.default.writeFile("result.json", json, function (err) {
    if (err) console.log("not saved");
  });
};

var urlPage = "https://www.ua-football.com/ukrainian/high/";
(0, _parsePost.parseLinks)(urlPage, ".fbi", 3).then(function (links) {
  (0, _parsePost.getPosts)(links).then(function (posts) {
    return saveResult((0, _stringify2.default)(posts, 0, 4));
  }).catch(function (e) {
    return console.log(e);
  });
}).catch(function (e) {
  return console.log(e);
});