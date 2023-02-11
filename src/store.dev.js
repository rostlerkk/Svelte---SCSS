"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title = void 0;

var _store = require("svelte/store");

var title = (0, _store.writable)(0);
exports.title = title;