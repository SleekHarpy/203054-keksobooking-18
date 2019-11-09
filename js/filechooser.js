'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 40;
  var IMAGE_HEIGTH = 44;
  var IMAGE_MARGIN = '14px';

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserImage = document.querySelector('#images');
  var previewImageContainer = document.querySelector('.ad-form__photo-container');
  var previewImageBox = document.querySelector('.ad-form__photo');
  var firstLoad = true;

  var updateAvatar = function (src) {
    previewAvatar.src = src;
  };


  var addImage = function (src) {
    if (firstLoad) {
      previewImageBox.remove();
      firstLoad = false;
    }

    var adFormPhoto = createAfFormPhoto(src);
    previewImageContainer.appendChild(adFormPhoto);
  };

  var createAfFormPhoto = function (src) {
    var previewDiv = document.createElement('div');
    previewImageContainer.appendChild(previewDiv);
    previewDiv.classList.add('ad-form__photo');

    var previewImage = document.createElement('img');
    previewImage.src = src;
    previewImage.width = IMAGE_WIDTH;
    previewImage.height = IMAGE_HEIGTH;
    previewImage.style.margin = IMAGE_MARGIN;
    previewDiv.appendChild(previewImage);

    return previewDiv;
  };


  var onChooseFile = function (chooser) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (chooser === fileChooserAvatar) {
          updateAvatar(reader.result);
        } else {
          addImage(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    onChooseFile(fileChooserAvatar, previewAvatar);
  });

  fileChooserImage.addEventListener('change', function () {
    onChooseFile(fileChooserImage);
  });

  window.cleanChooser = function () {
    firstLoad = true;
    var dataPreviewImageBoxes = Array.from(document.querySelectorAll('.ad-form__photo'));

    previewAvatar.src = 'img/muffin-grey.svg';

    for (var i = 0; i < dataPreviewImageBoxes.length; i++) {
      dataPreviewImageBoxes[i].remove();
    }
    previewImageContainer.appendChild(previewImageBox);

  };
})();
