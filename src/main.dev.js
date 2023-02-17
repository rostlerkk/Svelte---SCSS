"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _App = _interopRequireDefault(require("./App.svelte"));

var _Menu = _interopRequireDefault(require("./components/Menu.svelte"));

var _Header = _interopRequireDefault(require("./components/Header.svelte"));

var _Footer = _interopRequireDefault(require("./components/Footer.svelte"));

var _Foods = _interopRequireDefault(require("./components/Foods.svelte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var header = new _Header["default"]({
  target: document.body
});
var app = new _App["default"]({
  target: document.body,
  props: {
    name: 'world'
  }
});
var menu = new _Menu["default"]({
  target: document.body
});
var foods = new _Foods["default"]({
  target: document.body
});
var footer = new _Footer["default"]({
  target: document.body
});
var _default = app;
exports["default"] = _default;