'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 40;
  var IMAGE_HEIGTH = 44;
  var IMAGE_MARGIN = '14px';

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserImage = document.querySelector('#images');
  var previewImageContainer = document.querySelector('.ad-form__photo');
  var previewImage;

  var renderImgElement = function (content) {
    previewImage = document.createElement('img');
    previewImage.src = content.result;
    previewImage.width = IMAGE_WIDTH;
    previewImage.height = IMAGE_HEIGTH;
    previewImage.style.margin = IMAGE_MARGIN;
    previewImageContainer.appendChild(previewImage);
  };


  var onChooseFile = function (choose, preview, isExistImg) {
    var file = choose.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (!isExistImg) {
          renderImgElement(reader);
        } else {
          preview.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    onChooseFile(fileChooserAvatar, previewAvatar, true);
  });

  fileChooserImage.addEventListener('change', function () {
    onChooseFile(fileChooserImage, previewImage, false);
  });

  window.cleanChooser = function () {
    previewAvatar.src = 'img/muffin-grey.svg';
    if (previewImage) {
      previewImage.remove();
    }
  };
})();
