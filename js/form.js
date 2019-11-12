'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var typeHousingSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');

    window.util.enableElements(adFormFieldsets);
    window.filters.enableFilters();
  };

  var fillInAddress = function (pinCoord) {
    var address = document.querySelector('#address');

    address.value = pinCoord.x + ', ' + pinCoord.y;
  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.cleanChooser();
    adForm.reset();

    window.util.disableElements(adFormFieldsets);
    window.filters.disableFilters();

    fillInAddress(window.map.getCoordinatesPinMain(true));
  };

  disableForm();

  var onRoomGuestSelectChange = function () {
    var roomToGuestMessage = '';

    if (roomNumber.value !== '100' && capacity.value > roomNumber.value) {
      roomToGuestMessage = 'Извините, но количество гостей не должно превышать ' + roomNumber.value + '.';
    } else if (roomNumber.value !== '100' && capacity.value === '0') {
      roomToGuestMessage = 'Извините, но данная опция доступна только для аппартаментов со 100 комнатами.';
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      roomToGuestMessage = 'Извините, но аппартаменты на 100 комнат не предназначены для гостей.';
    }

    capacity.setCustomValidity(roomToGuestMessage);
  };

  onRoomGuestSelectChange();

  roomNumber.addEventListener('change', onRoomGuestSelectChange);
  capacity.addEventListener('change', onRoomGuestSelectChange);

  var onHousingPriceSelectChange = function () {
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

  onHousingPriceSelectChange();

  typeHousingSelect.addEventListener('change', onHousingPriceSelectChange);
  priceInput.addEventListener('change', onHousingPriceSelectChange);

  var onTimeInSelectChange = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  var onTimeOutSelectChange = function (evt) {
    timeOutSelect.value = evt.target.value;
  };

  timeOutSelect.addEventListener('change', onTimeInSelectChange);
  timeInSelect.addEventListener('change', onTimeOutSelectChange);

  adForm.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(adForm), function () {
      window.map.disable();
      window.form.disable();
      window.message.showSuccessMessage();
    }, function () {
      window.message.showErrorMessage();
    });
    evt.preventDefault();
  });

  adFormResetButton.addEventListener('click', function () {
    window.map.disable();
    window.form.disable();
  });

  window.form = {
    enable: enableForm,
    disable: disableForm,
    fillInAddress: fillInAddress
  };
})();
