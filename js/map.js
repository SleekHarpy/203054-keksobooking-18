'use strict';

(function () {
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_ARROW = 22;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ENTER_KEYCODE = 13;
  var SPACEBAR_KEYCODE = 32;

  var mapBlock = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  window.form.disable();

  var getCoordinatesPinMain = function (isFaded) {
    var x = Number(pinMain.style.left.replace(/[^\d]/g, ''));
    var y = Number(pinMain.style.top.replace(/[^\d]/g, ''));
    if (isFaded) {
      x = Math.round((x + MAP_PIN_MAIN_WIDTH / 2));
      y = Math.round((y + MAP_PIN_MAIN_HEIGHT / 2));
      return {
        x: x,
        y: y
      };
    } else {
      x = Math.round((x + MAP_PIN_MAIN_WIDTH / 2));
      y = Math.round((y + MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_ARROW));
      return {
        x: x,
        y: y
      };
    }
  };

  window.form.fillInAddress(getCoordinatesPinMain(true));

  var onPinMainMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (currentCoords.x >= MIN_X - MAP_PIN_MAIN_WIDTH / 2 && currentCoords.x <= MAX_X - MAP_PIN_MAIN_WIDTH / 2) {
        pinMain.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y >= MIN_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_ARROW) && currentCoords.y <= MAX_Y - (MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_ARROW)) {
        pinMain.style.top = currentCoords.y + 'px';
      }

      window.form.fillInAddress(getCoordinatesPinMain());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onPinMainMove);

  var renderPins = function (arrayObj) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayObj.length; i++) {
      fragment.appendChild(window.pin.generatePinElement(arrayObj[i]));
    }
    mapPins.appendChild(fragment);
  };

  var pageActivate = function () {
    mapBlock.classList.remove('map--faded');

    window.load(function (data) {
      renderPins(data);
    }, function () {
      window.message.showErrorMessage();
    });

    window.form.enable();

    window.form.fillInAddress(getCoordinatesPinMain(false));
  };

  var onPageActivatePress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
      pageActivate();
    }
  };

  pinMain.addEventListener('mousedown', pageActivate);
  pinMain.addEventListener('keydown', onPageActivatePress);

  window.map = {
    disable: function () {
      mapBlock.classList.add('map--faded');

      pinMain.style.top = MAP_PIN_Y + 'px';
      pinMain.style.left = MAP_PIN_X + 'px';

      var mapPin = document.querySelectorAll('.map__pin');
      var pins = function () {
        for (var i = 1; i < mapPin.length; i++) {
          mapPin[i].remove();
        }
      };

      pins();

      var popup = document.querySelector('.popup');

      if (popup) {
        popup.remove();
      }

      window.form.disable();

      window.form.fillInAddress(getCoordinatesPinMain(true));
    },
    renderCard: function (arrayObj) {
      var cardElement = window.card.generateCardElement(arrayObj);

      mapBlock.appendChild(cardElement);
    }
  };
})();
