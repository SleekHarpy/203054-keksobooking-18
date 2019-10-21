'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
  };

  window.message = showErrorMessage;
})();
