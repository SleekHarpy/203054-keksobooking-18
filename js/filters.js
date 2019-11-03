'use strict';

(function () {
  var QUANTITY_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  window.filters = {
    getData: function (data) {
      var changeDataPins = function () {
        var dataPins = data.filter(function (pins) {
          return pins.offer.type === housingType.value || housingType.value === 'any';
        }).slice(0, QUANTITY_PINS);

        return dataPins;
      };

      var onFiltersChange = function () {
        window.map.removePopup();
        window.map.removePinElements();
        window.map.renderPins(changeDataPins());
      };

      housingType.addEventListener('change', onFiltersChange);

      return changeDataPins();
    }
  };
})();
