'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createFeatures = function (dataFe) {
    var fragment = document.createDocumentFragment();

    dataFe.offer.features.forEach(function (i) {
      var featureElement = document.createElement('li');

      featureElement.classList.add('popup__feature', 'popup__feature--' + i);
      fragment.appendChild(featureElement);
    });

    return fragment;
  };

  var createPhoto = function (dataPh) {
    var fragment = document.createDocumentFragment();

    dataPh.offer.photos.forEach(function (i) {
      var photoElement = document.createElement('img');

      photoElement.classList.add('popup__photo');
      photoElement.src = i;
      photoElement.width = PHOTO_WIDTH;
      photoElement.height = PHOTO_HEIGHT;
      photoElement.alt = 'Фотография жилья';
      fragment.appendChild(photoElement);
    });

    return fragment;
  };

  window.generateCardElement = function (obj) {
    var cardElement = cardTemplate.cloneNode(true);
    var closePopupButton = cardElement.querySelector('.popup__close');
    var cardElementType = cardElement.querySelector('.popup__type');

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';

    switch (obj.offer.type) {
      case 'palace': cardElementType.textContent = 'Дворец';
        break;
      case 'flat': cardElementType.textContent = 'Квартира';
        break;
      case 'house': cardElementType.textContent = 'Дом';
        break;
      case 'bungalo': cardElementType.textContent = 'Бунгало';
        break;
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
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        onClosePopupClick();
      }
    };

    var onClosePopupClick = function () {
      cardElement.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };

    closePopupButton.addEventListener('click', onClosePopupClick);
    closePopupButton.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('keydown', onPopupEscPress);

    return cardElement;
  };
})();
