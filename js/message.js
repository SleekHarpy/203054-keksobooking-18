'use strict';

(function () {
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var showErrorMessage = function () {
    var errorElement = errorTemplate.cloneNode(true);

    mainBlock.appendChild(errorElement);

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        closeError();
      }
    };

    var closeError = function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    };

    document.addEventListener('keydown', onErrorEscPress);
    errorElement.addEventListener('click', closeError);
  };

  var showSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);

    mainBlock.appendChild(successElement);

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        closeSuccess();
      }
    };

    var closeSuccess = function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    document.addEventListener('keydown', onSuccessEscPress);
    successElement.addEventListener('click', closeSuccess);
  };

  window.message = {
    showErrorMessage: showErrorMessage,
    showSuccessMessage: showSuccessMessage
  };
})();
