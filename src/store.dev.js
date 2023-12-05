"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all_scenes_object = exports.all_scenes = exports.active_scene = exports.menu = void 0;

var _store = require("svelte/store");

// All  stored variables
var menu = (0, _store.writable)(false);
exports.menu = menu;
var active_scene = (0, _store.writable)();
exports.active_scene = active_scene;
var all_scenes = (0, _store.writable)();
exports.all_scenes = all_scenes;
var all_scenes_object = (0, _store.writable)();
exports.all_scenes_object = all_scenes_object;