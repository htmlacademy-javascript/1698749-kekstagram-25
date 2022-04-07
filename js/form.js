import {sendData} from './api.js';
import {removeClassByPrefix} from './utils.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector ('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const scaleValue = document.querySelector('.scale__control--value');
const previewPicture = document.querySelector ('.img-upload__preview');
const imgPreview = previewPicture.querySelector ('.img-upload__preview img');
const ListFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fonSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backGroundColor = 'red';
  alertContainer.style.textContent = message;
  document.body.append(alertContainer);
};

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
      document.querySelector('#success').classList.add('hidden');
    }
  });
};

const expandPicture = (el) => {
  el.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  removeClassByPrefix(imgPreview, 'effects__preview');
  scaleValue.value = '100%';
  previewPicture.style.filter = 'none';
  imgPreview.style.transform = 'scale(1)';
};

const addClickHandlerAlert = (el) => {
  const closeButton = el.querySelector('button');
  closeButton.addEventListener('click', () => {
    el.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    el.closest('section').classList.add('hidden');
  });
  document.querySelector('.modal-open').addEventListener('click', () => {
    el.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    el.closest('section').classList.add('hidden');
  });
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
  const re = new RegExp('(#)([А-яA-z0-9]{1,19})');
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  for (let i = 0; i < newHash.length; i++) {
    if (!re.test(newHash[i])){
      return false;
    }
  }
  return true;
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const openError = () => {
  uploadOverlay.classList.add('hidden');
  const errorWindow = errorTemplate.cloneNode(true);
  ListFragment.appendChild(errorWindow);
  document.querySelector('body').appendChild(ListFragment);
  addClickHandlerAlert(document.querySelector('.error__inner'));
  addEscHandler (document.querySelector('.error__inner'));
};

const openSuccess = () => {
  uploadOverlay.classList.add('hidden');
  const successWindow = successTemplate.cloneNode(true);
  ListFragment.appendChild(successWindow);
  document.querySelector('body').appendChild(ListFragment);
  addClickHandlerAlert(document.querySelector('.success__inner'));
  addEscHandler (document.querySelector('.success__inner'));
};

const setUserFormSubmit = (onSuccess, onFail) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess(openSuccess());
          onFail (openError());
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


export {setUserFormSubmit};
export {addUploadHandler};
