'use strict';

var PIN_MIN_X = 0;
var PIN_MAX_X = 1200;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var QUANTITY_AD_OBJECT = 8;
var TITLE_HOUSING = ['Уютное гнездышко для молодоженов', 'Уютная квартира', 'Номер на двоих в центре', 'Чудесный лофт', 'Студия с отдельной спальней', 'Дизайнерская квартира', 'Уникальная студия с камином', 'Уютный двухэтажный лофт'];
var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES_HOUSING = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_HOUSING = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a mi semper, varius dui eu, tempus velit. Etiam lobortis ante vitae nibh condimentum ornare. Donec laoreet quam vel ante sagittis fermentum. Suspendisse luctus, nibh vitae sollicitudin consequat, magna purus porttitor massa, et fringilla nulla justo at lorem. Aenean sed pellentesque.';
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65 + 22;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var SPACEBAR_KEYCODE = 32;

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var getRandomArrey = function (array) {
  return array.slice(0, randomInteger(0, array.length));
};

var generateObject = function (avatarNum) {
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarNum + '.png'
    },

    offer: {
      title: TITLE_HOUSING[randomInteger(0, TITLE_HOUSING.length - 1)],
      address: '600, 350',
      price: randomInteger(1000, 7000),
      type: TYPE_HOUSING[randomInteger(0, TYPE_HOUSING.length - 1)],
      rooms: randomInteger(1, 3),
      guests: randomInteger(1, 8),
      checkin: '1' + randomInteger(2, 4) + ':00',
      checkout: '1' + randomInteger(2, 4) + ':00',
      features: getRandomArrey(FEATURES_HOUSING),
      description: LOREM.slice(0, 130),
      photos: getRandomArrey(PHOTOS_HOUSING)
    },

    location: {
      x: randomInteger(PIN_MIN_X, PIN_MAX_X),
      y: randomInteger(PIN_MIN_Y, PIN_MAX_Y)
    }
  };
};

var generateData = function () {
  var dataArray = [];
  for (var i = 1; i <= QUANTITY_AD_OBJECT; i++) {
    dataArray.push(generateObject(i));
  }
  return dataArray;
};

var dataArray = generateData();

// Метки объявлений на карте

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

var generatePinElement = function (obj) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = obj.location.x + 'px';
  pinElement.style.top = obj.location.y + 'px';

  pinElement.querySelector('img').src = obj.author.avatar;
  pinElement.querySelector('img').alt = obj.offer.title;

  var pinOpenCard = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    renderCard(obj);
  };

  pinElement.addEventListener('click', pinOpenCard);

  return pinElement;
};

var renderPins = function (arrayObj) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayObj.length; i++) {
    fragment.appendChild(generatePinElement(arrayObj[i]));
  }
  mapPins.appendChild(fragment);
};

// Карточка объявления

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFilters = document.querySelector('.map__filters-container');

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

var generateCardElement = function (obj) {
  var cardElement = cardTemplate.cloneNode(true);

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

  var closePopupButton = cardElement.querySelector('.popup__close');

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
};

var renderCard = function (arrayObj) {
  var cardElement = generateCardElement(arrayObj);
  map.insertBefore(cardElement, mapFilters);
};

// 8. Личный проект: подробности: module4-task2

var pinMain = document.querySelector('.map__pin--main');
var mapFiltersSelects = mapFilters.querySelectorAll('select, fieldset');

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

var enableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

disableElements(adFormFieldsets);
disableElements(mapFiltersSelects);

var pageActivate = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderPins(dataArray);

  enableElements(adFormFieldsets);
  enableElements(mapFiltersSelects);
};

var onPageActivatePress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACEBAR_KEYCODE) {
    pageActivate();
  }
};

pinMain.addEventListener('mousedown', pageActivate);
pinMain.addEventListener('keydown', onPageActivatePress);

var getCoordinatesPinMain = function () {
  var x = Math.round((Number(pinMain.style.left.replace(/[^\d]/g, '')) + (MAP_PIN_MAIN_WIDTH / 2)));
  var y = Math.round((Number(pinMain.style.top.replace(/[^\d]/g, '')) + MAP_PIN_MAIN_HEIGHT));
  return {
    x: x,
    y: y
  };
};

var pinMainAddress = getCoordinatesPinMain();

var fillInAddress = function (pinCoord) {
  var address = document.querySelector('#address');

  address.value = pinCoord.x + ', ' + pinCoord.y;
};

fillInAddress(pinMainAddress);

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

// Личный проект: доверяй, но проверяй module4-task3

var typeHousingSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');

var validateHousingPrice = function () {
  var priceSelectMessage = '';
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
  priceInput.setCustomValidity(priceSelectMessage);
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
