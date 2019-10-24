'use strict';

(function () {
  var QUANTITY_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  window.server.load(function (data) {
    var dataPins = [];
    var changeDataPins = function () {
      dataPins.length = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].offer.type === housingType.value || housingType.value === 'any') {
          dataPins.push(data[i]);
        }
        if (dataPins.length > QUANTITY_PINS) {
          dataPins.length = QUANTITY_PINS;
        }
      }
    };
    changeDataPins();

    var onFiltersChange = function () {
      window.map.removePopup();
      window.map.removePinElements();
      changeDataPins();
      window.map.renderPins(dataPins);
    };

    housingType.addEventListener('change', onFiltersChange);

    window.dataPins = dataPins;
  });
})();
