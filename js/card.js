'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createFeatures = function (dataFe) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataFe.offer.features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + dataFe.offer.features[i]);
      fragment.appendChild(featureElement);
    }

    return fragment;
  };

  var createPhoto = function (dataPh) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataPh.offer.photos.length; i++) {
      var photoElement = document.createElement('img');

      photoElement.classList.add('popup__photo');
      photoElement.src = dataPh.offer.photos[i];
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      fragment.appendChild(photoElement);
    }

    return fragment;
  };

  window.card = {
    ESC_KEYCODE: ESC_KEYCODE,

    generateCardElement: function (obj) {

      var cardElement = cardTemplate.cloneNode(true);
      var closePopupButton = cardElement.querySelector('.popup__close');

      cardElement.querySelector('.popup__title').textContent = obj.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';

      if (obj.offer.type === 'palace') {
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
      } else if (obj.offer.type === 'flat') {
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
      } else if (obj.offer.type === 'house') {
        cardElement.querySelector('.popup__type').textContent = 'Дом';
      } else if (obj.offer.type === 'bungalo') {
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      }

      cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей ';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' , выезд до ' + obj.offer.checkout;
      cardElement.querySelector('.popup__features').innerHTML = '';
      cardElement.querySelector('.popup__features').appendChild(createFeatures(obj));
      cardElement.querySelector('.popup__description').textContent = obj.offer.description;
      cardElement.querySelector('.popup__photos').innerHTML = '';
      cardElement.querySelector('.popup__photos').appendChild(createPhoto(obj));

      cardElement.querySelector('.popup__avatar').src = obj.author.avatar;

      var onPopupEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      };

      var closePopup = function () {
        cardElement.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      };

      closePopupButton.addEventListener('click', closePopup);
      closePopupButton.addEventListener('keydown', onPopupEscPress);
      document.addEventListener('keydown', onPopupEscPress);

      return cardElement;
    }
  };
})();
