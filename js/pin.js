'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 50;
  var MAP_PIN_ARROW = 20;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

  window.pin = {
    generatePinElement: function (obj) {
      var pinElement = mapPinTemplate.cloneNode(true);

      pinElement.style.left = obj.location.x - (MAP_PIN_HEIGHT / 2) + 'px';
      pinElement.style.top = obj.location.y - (MAP_PIN_WIDTH + MAP_PIN_ARROW) + 'px';

      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.querySelector('img').alt = obj.offer.title;

      var pinOpenCard = function () {
        var popup = document.querySelector('.popup');

        if (popup) {
          popup.remove();
        }

        window.map.renderCard(obj);
      };

      pinElement.addEventListener('click', pinOpenCard);

      return pinElement;
    }
  };
})();
