'use strict';

(function () {
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var showErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);

    mainBlock.appendChild(errorElement);

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        onCloseErrorClick();
      }
    };

    var onCloseErrorClick = function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    };

    document.addEventListener('keydown', onErrorEscPress);
    errorElement.addEventListener('click', onCloseErrorClick);
  };

  var showSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);

    mainBlock.appendChild(successElement);

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        onCloseSuccessClick();
      }
    };

    var onCloseSuccessClick = function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    document.addEventListener('keydown', onSuccessEscPress);
    successElement.addEventListener('click', onCloseSuccessClick);
  };

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };
})();
