"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _App = _interopRequireDefault(require("./App.svelte"));

var _Fancygallery = _interopRequireDefault(require("./components/Fancygallery.svelte"));

var _Slider = _interopRequireDefault(require("./components/Slider.svelte"));

var _SceneName = _interopRequireDefault(require("./components/SceneName.svelte"));

var _Header = _interopRequireDefault(require("./components/Header.svelte"));

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
var slider = new _Slider["default"]({
  target: document.body
});
var sceneName = new _SceneName["default"]({
  target: document.body
});
var header = new _Header["default"]({
  target: document.body
});
var _default = app;
exports["default"] = _default;