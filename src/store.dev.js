"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menu = void 0;

var _store = require("svelte/store");

// All  stored variables
var menu = (0, _store.writable)(true);
exports.menu = menu;