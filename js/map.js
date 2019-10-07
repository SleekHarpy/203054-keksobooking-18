'use strict';

(function () {
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65 + 22;
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;

  var mapBlock = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var getCoordinatesPinMain = function () {
    var x = Math.round((Number(pinMain.style.left.replace(/[^\d]/g, '')) + (MAP_PIN_MAIN_WIDTH / 2)));
    var y = Math.round((Number(pinMain.style.top.replace(/[^\d]/g, '')) + MAP_PIN_MAIN_HEIGHT));
    return {
      x: x,
      y: y
    };
  };

  window.form.disable();
  window.form.fillInAddress(getCoordinatesPinMain());


  var pageActivate = function () {
    mapBlock.classList.remove('map--faded');

    window.map.renderPins(window.data);

    window.form.enable();
  };

  var onPageActivatePress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
      pageActivate();
    }
  };

  pinMain.addEventListener('mousedown', pageActivate);
  pinMain.addEventListener('keydown', onPageActivatePress);

  window.map = {
    mapBlock: mapBlock,
    renderPins: function (arrayObj) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrayObj.length; i++) {
        fragment.appendChild(window.pin.generatePinElement(arrayObj[i]));
      }
      mapPins.appendChild(fragment);
    },
    renderCard: function (arrayObj) {
      var cardElement = window.card.generateCardElement(arrayObj);
      mapBlock.appendChild(cardElement);
    }
  };
})();
