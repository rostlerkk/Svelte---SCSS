"use strict";

;

(function ($, window, document, undefined) {
  $.fn.intro = function () {
    $('body').prepend('<div id="intro"></div>');
  };
})(jQuery, window, document);