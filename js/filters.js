'use strict';

(function () {
  var QUANTITY_PINS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFilters.querySelectorAll('select, fieldset');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var checkboxFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox'));

  var enableFilters = function () {
    window.util.enableElements(mapFiltersSelects);
  };

  var disableFilters = function () {
    mapFilters.reset();
    window.util.disableElements(mapFiltersSelects);
  };

  window.filters = {
    enableFilters: enableFilters,
    disableFilters: disableFilters,
    getData: function (data) {

      var isMatchedTypeCount = function (adInfo) {
        return adInfo.offer.type === housingType.value || housingType.value === 'any';
      };

      var isMatchedPrice = function (elem) {
        var result = false;

        switch (housingPrice.value) {
          default:
            result = true;
            break;
          case 'low':
            result = elem.offer.price < MIN_PRICE;
            break;
          case 'middle':
            result = elem.offer.price >= MIN_PRICE && elem.offer.price <= MAX_PRICE;
            break;
          case 'high':
            result = elem.offer.price > MAX_PRICE;
            break;
        }

        return result;
      };

      var isMatchedRoomCount = function (adInfo) {
        return adInfo.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';
      };

      var isMatchedGuestsCount = function (adInfo) {
        return adInfo.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any';
      };

      function isSubArray(subArray, array) {
        return subArray.every(function (value) {
          return array.includes(value);
        });
      }

      var isMatchedFeatures = function (elem) {
        var dataFeatures = checkboxFeatures.filter(function (input) {
          return input.checked;
        }).map(function (input) {
          return input.value;
        });

        return isSubArray(dataFeatures, elem.offer.features);
      };

      var changeDataPins = function () {
        var dataPins = data.filter(function (adInfo) {
          return isMatchedTypeCount(adInfo)
          && isMatchedRoomCount(adInfo)
          && isMatchedGuestsCount(adInfo)
          && isMatchedPrice(adInfo)
          && isMatchedFeatures(adInfo);
        });

        return dataPins;
      };

      var onFiltersChange = window.debounce(function () {
        window.map.removePopup();
        window.map.removePinElements();
        window.map.renderPins(changeDataPins());
      });

      mapFilters.addEventListener('change', onFiltersChange);

      return changeDataPins().slice(0, QUANTITY_PINS);
    }
  };
})();
