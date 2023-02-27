"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLang = exports.vivaData = void 0;

var _store = require("svelte/store");

var vivaData = (0, _store.writable)({});
exports.vivaData = vivaData;
var userLang = (0, _store.writable)();
exports.userLang = userLang;