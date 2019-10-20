'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(showErrorMessage());
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };

})();
