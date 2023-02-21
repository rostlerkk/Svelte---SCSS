"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _App = _interopRequireDefault(require("./App.svelte"));

var _Home = _interopRequireDefault(require("./components/Home.svelte"));

var _Menu = _interopRequireDefault(require("./components/Menu.svelte"));

var _Foods = _interopRequireDefault(require("./components/Foods.svelte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Header from './components/Header.svelte';
// import Footer from './components/Footer.svelte';
// const header = new Header({
// 	target: document.body
// });
var home = new _Home["default"]({
  target: document.body
});
var app = new _App["default"]({
  target: document.body
});
var menu = new _Menu["default"]({
  target: document.body
});
var foods = new _Foods["default"]({
  target: document.body
}); // const footer = new Footer({
// 	target: document.body
// });

var _default = app;
exports["default"] = _default;