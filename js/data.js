'use strict';

(function () {
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

  window.data = generateData();
})();
