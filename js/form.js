const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector ('#upload-file');
const imgPreview = document.querySelector ('.img-upload__preview img');
const uploadForm = document.querySelector('.img-upload__form');

const addEscHandler =  (el) => {
  addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') {
      if (document.querySelector('.text__hashtags') !== document.activeElement && document.querySelector('.text__description') !== document.activeElement) {
        el.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
        imgPreview.src = '';
        uploadInput.value = '';
      }
    }
  });
};

const expandPicture = (el) => {
  el.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const addClickHandler = (el) => {
  const closeButton = el.querySelector('#upload-cancel');
  closeButton.addEventListener('click', () => {
    el.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    imgPreview.src = '';
    uploadInput.value = '';
  });
};

function addUploadHandler () {
  uploadInput.addEventListener ('change', () => {
    const [file] = uploadInput.files;
    if (file) {
      imgPreview.src = URL.createObjectURL(file);
    }

    addEscHandler(uploadOverlay);

    expandPicture(uploadOverlay);

    addClickHandler(uploadOverlay);
  });
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text__item', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__text__item__error' // Класс для элемента с текстом ошибки
});

function validateComment (value) {
  return value.length <= 140;
}

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  hashLength,
  'Можно ввести не более 5 хештегов'
);

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  hashSame,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  hashExpression,
  'Хештег должен соответствовать виду #* и не должен быть больше 20 символов'
);


pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  'Комментарий не должен быть больше 140 символов'
);

function hashLength () {
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  if (newHash.length > 5){
    return false;
  }
  return true;
}


function hashSame () {
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  for (let i = 0; i < newHash.length-1; i++) {
    newHash[i].toLowerCase();
    if (newHash[i] === newHash[i+1]){
      return false;
    }
  }
  return true;
}

function hashExpression () {
  const re = new RegExp('(#)([A-z0-9]{1,19})');
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  for (let i = 0; i < newHash.length; i++) {
    if (!re.test(newHash[i])){
      return false;
    }
  }
  return true;
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {addUploadHandler};
