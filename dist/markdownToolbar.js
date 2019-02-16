var MarkdownToolbar =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hr = __webpack_require__(1);

var _hr2 = _interopRequireDefault(_hr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Quill.register('formats/horizontal', _hr2.default);

var MarkdownToolbar = function MarkdownToolbar(quill, options) {
  var _this = this;

  _classCallCheck(this, MarkdownToolbar);

  this.quill = quill;
  this.options = options;

  document.getElementById('markdownButton').onmousedown = function (event) {
    var selection = _this.quill.getSelection();
    if (selection.length === 0) return;

    var lines = _this.quill.getLines(selection.index, selection.length);
    lines.forEach(function (line) {
      var lineText = line.domNode.textContent;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var match = _step.value;

          var matchedText = lineText.match(match.pattern);
          if (matchedText) {
            console.log('matched', match.name, lineText);
            match.action(lineText, match.pattern, _this.quill.getIndex(line));

            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  };

  this.matches = [{
    name: 'header',
    pattern: /^(#){1,6}\s/g,
    action: function action(text, pattern, lineStartIndex) {
      var match = pattern.exec(text);
      if (!match) return;
      var size = match[0].length;

      _this.quill.formatLine(lineStartIndex, text.length, 'header', size - 1);
      _this.quill.deleteText(lineStartIndex, size);
    }
  }, {
    name: 'blockquote',
    pattern: /^(>)\s/g,
    action: function action(text, pattern, lineStartIndex) {
      _this.quill.formatLine(lineStartIndex, 1, 'blockquote', true);
      _this.quill.deleteText(lineStartIndex, 2);
    }
  }, {
    name: 'code-block',
    pattern: /^`{3}/g,
    action: function action(text, pattern, lineStartIndex) {
      _this.quill.formatLine(lineStartIndex + 4, 1, 'code-block', true);
      _this.quill.deleteText(lineStartIndex, 4);
    }
  }, {
    name: 'bolditalic',
    pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
    action: function action(text, pattern, lineStartIndex) {
      var match = pattern.exec(text);

      var annotatedText = match[0];
      var matchedText = match[1];
      var startIndex = lineStartIndex + match.index;

      if (text.match(/^([*_ \n]+)$/g)) return;

      _this.quill.deleteText(startIndex, annotatedText.length);
      _this.quill.insertText(startIndex, matchedText, {
        bold: true,
        italic: true
      });
    }
  }, {
    name: 'bold',
    pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
    action: function action(text, pattern, lineStartIndex) {
      var match = pattern.exec(text);

      var annotatedText = match[0];
      var matchedText = match[1];
      var startIndex = lineStartIndex + match.index;

      if (text.match(/^([*_ \n]+)$/g)) return;

      _this.quill.deleteText(startIndex, annotatedText.length);
      _this.quill.insertText(startIndex, matchedText, {
        bold: true
      });
    }
  }, {
    name: 'italic',
    pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
    action: function action(text, pattern, lineStartIndex) {
      var match = pattern.exec(text);

      var annotatedText = match[0];
      var matchedText = match[1];
      var startIndex = lineStartIndex + match.index;

      if (text.match(/^([*_ \n]+)$/g)) return;

      _this.quill.deleteText(startIndex, annotatedText.length);
      _this.quill.insertText(startIndex, matchedText, {
        italic: true
      });
    }
  }, {
    name: 'strikethrough',
    pattern: /(?:~~)(.+?)(?:~~)/g,
    action: function action(text, pattern, lineStartIndex) {
      var match = pattern.exec(text);

      var annotatedText = match[0];
      var matchedText = match[1];
      var startIndex = lineStartIndex + match.index;

      if (text.match(/^([*_ \n]+)$/g)) return;

      _this.quill.deleteText(startIndex, annotatedText.length);
      _this.quill.insertText(startIndex, matchedText, {
        strike: true
      });
    }
  }, {
    name: 'code',
    pattern: /`([^`\n\r]+)`/g,
    action: function action(text, pattern, lineStart) {
      var match = pattern.exec(text);

      var annotatedText = match[0];
      var matchedText = match[1];
      var startIndex = lineStart + match.index;

      if (text.match(/^([*_ \n]+)$/g)) return;

      _this.quill.deleteText(startIndex, annotatedText.length);
      _this.quill.insertText(startIndex, matchedText, {
        code: true
      });
    }
  }, {
    name: 'hr',
    pattern: /^([-*]\s?){3}/g,
    action: function action(text, pattern, lineStart) {
      _this.quill.deleteText(lineStart, text.length);
      _this.quill.insertEmbed(lineStart + 1, 'hr', true, Quill.sources.USER);
      _this.quill.insertText(lineStart + 2, "\n", Quill.sources.SILENT);
    }
  }, {
    name: 'asterisk-ul',
    pattern: /^\s*[\*|\+|-]\s/g,
    action: function action(text, pattern, lineStart) {
      _this.quill.formatLine(lineStart, 1, 'list', 'unordered');
      _this.quill.deleteText(lineStart, 2);
    }
  }, {
    name: 'image',
    pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
    action: function action(text, pattern, lineStart) {
      var startIndex = text.search(pattern);
      var matchedText = text.match(pattern)[0];
      var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
      if (startIndex !== -1) {
        _this.quill.deleteText(lineStart, matchedText.length);
        _this.quill.insertEmbed(lineStart, 'image', hrefLink.slice(1, hrefLink.length - 1));
      }
    }
  }, {
    name: 'link',
    pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
    action: function action(text, pattern, lineStart) {
      var startIndex = text.search(pattern);
      var matchedText = text.match(pattern)[0];
      var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
      var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
      if (startIndex !== -1) {
        _this.quill.deleteText(lineStart, matchedText.length);
        _this.quill.insertText(lineStart, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
      }
    }
  }];
};

module.exports = MarkdownToolbar;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockEmbed = Quill.import('blots/block/embed');

var HorizontalRule = function (_BlockEmbed) {
  _inherits(HorizontalRule, _BlockEmbed);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _possibleConstructorReturn(this, (HorizontalRule.__proto__ || Object.getPrototypeOf(HorizontalRule)).apply(this, arguments));
  }

  return HorizontalRule;
}(BlockEmbed);

HorizontalRule.blotName = 'hr';
HorizontalRule.tagName = 'hr';

exports.default = HorizontalRule;

/***/ })
/******/ ]);
//# sourceMappingURL=markdownToolbar.js.map