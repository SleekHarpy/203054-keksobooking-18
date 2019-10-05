'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

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
      mapBlock.insertBefore(cardElement, window.form.mapFilters);
    }
  };

})();
