'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

  window.pin = {
    generatePinElement: function (obj) {
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
        window.map.renderCard(obj);
      };

      pinElement.addEventListener('click', pinOpenCard);

      return pinElement;
    }
  };
})();
