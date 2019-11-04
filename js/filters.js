'use strict';

(function () {
  var QUANTITY_PINS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingPrice = mapFilters.querySelector('#housing-price');


  window.filters = {
    getData: function (data) {

      var isMatchPrice = function (elem) {
        var result = false;

        switch (housingPrice.value) {
          case 'any':
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

      var changeDataPins = function () {
        var dataPins = data.filter(function (pins) {
          return pins.offer.type === housingType.value || housingType.value === 'any';
        }).filter(function (rooms) {
          return rooms.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';
        }).filter(function (guests) {
          return guests.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any';
        }).filter(function (price) {
          return isMatchPrice(price);
        }).slice(0, QUANTITY_PINS);

        return dataPins;
      };

      var onFiltersChange = function () {
        window.map.removePopup();
        window.map.removePinElements();
        window.map.renderPins(changeDataPins());
      };

      mapFilters.addEventListener('change', onFiltersChange);

      return changeDataPins();
    }
  };
})();
