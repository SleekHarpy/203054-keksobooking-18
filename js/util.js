'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var SPACEBAR_KEYCODE = 32;

  var enableElements = function (elements) {
    elements.forEach(function (i) {
      i.disabled = false;
    });
  };

  var disableElements = function (elements) {
    elements.forEach(function (i) {
      i.disabled = true;
    });
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    SPACEBAR_KEYCODE: SPACEBAR_KEYCODE,
    enableElements: enableElements,
    disableElements: disableElements
  };
})();
