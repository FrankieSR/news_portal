"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var parsePost = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, elems) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _unirest2.default.get(url).end(function (_ref2) {
              var body = _ref2.body;

              var $ = _cheerio2.default.load(body);

              var domain = url.match(/\/\/(.*?)\//)[1];
              var title = $(elems.title).text().trim();
              var image = $(elems.image).attr("src");
              image = image.indexOf("http") >= 0 ? image : "http://" + domain + image;
              var text = $(elems.text).text().trim();
              var views = $(elems.views).text().trim();

              var post = {
                title: title,
                image: image,
                text: text,
                views: views
              };

              console.log(post);
            });

          case 2:
            _context.next = 4;
            return delay(3000);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parsePost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _unirest = require("unirest");

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delay = function delay(ms) {
  return new _promise2.default(function (r) {
    return setTimeout(r, ms);
  });
};

module.exports = parsePost;