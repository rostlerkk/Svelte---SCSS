"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = exports.vivaIntro = exports.vivaIntroAfterEnd = exports.vivaAutoPlay = exports.aboutViva = exports.userLang = exports.vivaData = void 0;

var _store = require("svelte/store");

var vivaData = (0, _store.writable)({});
exports.vivaData = vivaData;
var userLang = (0, _store.writable)();
exports.userLang = userLang;
var aboutViva = (0, _store.writable)(false);
exports.aboutViva = aboutViva;
var vivaAutoPlay = (0, _store.writable)(false);
exports.vivaAutoPlay = vivaAutoPlay;
var vivaIntroAfterEnd = (0, _store.writable)(false);
exports.vivaIntroAfterEnd = vivaIntroAfterEnd;
var vivaIntro = (0, _store.writable)(false);
exports.vivaIntro = vivaIntro;
var model = (0, _store.writable)(false);
exports.model = model;