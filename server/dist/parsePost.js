"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var getPosts = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(links) {
    var posts, count, i, post;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            posts = [];
            count = links.length;
            i = 0;

          case 3:
            if (!(i < count)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return parsePost(links[i], _configs.elems.uaFootball).then(function (post) {
              return post;
            });

          case 6:
            post = _context.sent;

            posts.push(post);
            console.log(post);
            _context.next = 11;
            return log(i + 1, count, 2000);

          case 11:
            i++;
            _context.next = 3;
            break;

          case 14:
            return _context.abrupt("return", new _promise2.default(function (resolve, reject) {
              if (!posts.length) reject({ empty: "empty" });
              resolve(posts);
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPosts(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _unirest = require("unirest");

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _configs = require("./configs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = function log(i, count, ms) {
  return new _promise2.default(function (r) {
    return setTimeout(function () {
      console.log("Индекс: " + i + "; всего записей " + count);
      r();
    }, ms);
  });
};

function parsePost(url, elems) {
  return new _promise2.default(function (resolve, reject) {
    _unirest2.default.get(url).end(function (_ref) {
      var body = _ref.body,
          error = _ref.error;

      if (error) reject(error);

      var $ = _cheerio2.default.load(body);
      var title = $(elems.title).text().trim();
      var image = $(elems.image).attr("src");
      var text = $(elems.text).text().trim();
      var path = $(elems.path).attr("href");

      var post = {
        title: title,
        image: image,
        text: text
      };
      resolve(post);
    });
  });
}

function parseLinks(url, className) {
  var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  return new _promise2.default(function (resolve, reject) {
    var links = [];

    _unirest2.default.get(url).end(function (_ref2) {
      var body = _ref2.body,
          error = _ref2.error;

      if (error) reject(error);

      var $ = _cheerio2.default.load(body);

      $(className).each(function (i, e) {
        if (i + 1 <= maxLinks) links.push($(e).attr("href"));
      });
      resolve(links);
      if (!links.length) reject({ error: "empty" });
    });
  });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;