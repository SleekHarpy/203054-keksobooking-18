'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var HTTP_SUCCESS_CODE = 200;

  var generateXhrObject = function (onSuccess, onError, methot, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_SUCCESS_CODE) {
        onSuccess(xhr.response);
        window.server.downloadPins = xhr.response;
      } else {
        onError();
      }
    });

    xhr.open(methot, url);
    xhr.send(data);
  };

  window.server = {
    upload: function (data, onSuccess, onError) {
      generateXhrObject(onSuccess, onError, 'POST', URL_UPLOAD, data);
    },
    load: function (onSuccess, onError) {
      generateXhrObject(onSuccess, onError, 'GET', URL_LOAD);
    }
  };
})();
