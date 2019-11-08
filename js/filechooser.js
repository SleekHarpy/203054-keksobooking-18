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
  var previewImage = document.querySelector('.ad-form__photo img');

  var renderElements = function (content) {
    var createImgElement = function () {
      previewImage = document.createElement('img');
      previewImage.src = content.result;
      previewImage.width = IMAGE_WIDTH;
      previewImage.height = IMAGE_HEIGTH;
      previewImage.style.margin = IMAGE_MARGIN;

      return previewImage;
    };

    var createImgContainer = function () {
      var previewDiv = document.createElement('div');
      previewImageContainer.appendChild(previewDiv);
      previewDiv.classList.add('ad-form__photo');
      previewDiv.appendChild(createImgElement());
    };
    if (!previewImage) {
      previewImageBox.appendChild(createImgElement());
    } else {
      createImgContainer();
    }
  };


  var onChooseFile = function (choose, preview) {
    var file = choose.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview !== true & preview !== previewImage) {
          preview.src = reader.result;
        } else {
          renderElements(reader);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    onChooseFile(fileChooserAvatar, previewAvatar);
  });

  fileChooserImage.addEventListener('change', function () {
    onChooseFile(fileChooserImage, previewImage);
  });

  window.cleanChooser = function () {
    var dataPreviewImageBoxes = Array.from(document.querySelectorAll('.ad-form__photo'));

    previewAvatar.src = 'img/muffin-grey.svg';

    if (previewImage) {
      for (var i = 1; i < dataPreviewImageBoxes.length; i++) {
        dataPreviewImageBoxes[i].remove();
      }
      previewImage.remove();
    }
  };
})();
