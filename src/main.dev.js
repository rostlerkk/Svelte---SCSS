"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _App = _interopRequireDefault(require("./App.svelte"));

var _Fancygallery = _interopRequireDefault(require("./components/Fancygallery.svelte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new _App["default"]({
  target: document.body,
  props: {
    name: 'world'
  }
});
var fancygallery = new _Fancygallery["default"]({
  target: document.body,
  props: {
    name: 'world'
  }
});
var _default = app;
exports["default"] = _default;