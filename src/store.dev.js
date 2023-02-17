"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.active_menu_item = exports.menu_items = exports.title = void 0;

var _store = require("svelte/store");

var title = (0, _store.writable)(0);
exports.title = title;
var menu_items = (0, _store.writable)([]);
exports.menu_items = menu_items;
var active_menu_item = (0, _store.writable)("home");
exports.active_menu_item = active_menu_item;