'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var mapFiltersSelects = mapFilters.querySelectorAll('select, fieldset');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
    }
  };

  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
  };

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  function validateGuestNumber() {
    var roomToGuestMessage = '';
    if (roomNumber.value !== '100' && capacity.value > roomNumber.value) {
      roomToGuestMessage = 'Извините, но количество гостей не должно превышать ' + roomNumber.value + '.';
    } else if (roomNumber.value !== '100' && capacity.value === '0') {
      roomToGuestMessage = 'Извините, но данная опция доступна только для аппартаментов со 100 комнатами.';
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      roomToGuestMessage = 'Извините, но аппартаменты на 100 комнат не предназначены для гостей.';
    }
    capacity.setCustomValidity(roomToGuestMessage);
  }

  validateGuestNumber();

  roomNumber.addEventListener('change', validateGuestNumber);

  capacity.addEventListener('change', validateGuestNumber);

  var typeHousingSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var validateHousingPrice = function () {
    if (typeHousingSelect.value === 'bungalo') {
      priceInput.min = 0;
      priceInput.placeholder = 0;
    } else if (typeHousingSelect.value === 'flat') {
      priceInput.min = 1000;
      priceInput.placeholder = 1000;
    } else if (typeHousingSelect.value === 'house') {
      priceInput.min = 5000;
      priceInput.placeholder = 5000;
    } else if (typeHousingSelect.value === 'palace') {
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
    }
  };

  validateHousingPrice();

  typeHousingSelect.addEventListener('change', validateHousingPrice);

  priceInput.addEventListener('change', validateHousingPrice);

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  var updateTimeIn = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  var updateTimeOut = function (evt) {
    timeOutSelect.value = evt.target.value;
  };

  timeInSelect.addEventListener('change', updateTimeOut);
  timeOutSelect.addEventListener('change', updateTimeIn);

  window.form = {
    mapFilters: mapFilters,
    adForm: adForm,
    mapFiltersSelects: mapFiltersSelects,
    adFormFieldsets: adFormFieldsets,
    enable: function () {
      enableElements(adFormFieldsets);
      enableElements(mapFiltersSelects);
    },
    disable: function () {
      disableElements(adFormFieldsets);
      disableElements(mapFiltersSelects);
    },
    fillInAddress: function (pinCoord) {
      var address = document.querySelector('#address');
      address.value = pinCoord.x + ', ' + pinCoord.y;
    }
  };
})();
