import {sendData} from './api.js';
import {removeClassByPrefix, isEscapeKey} from './utils.js';

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
    if (isEscapeKey(event)) {
      event.preventDefault();
      if (document.querySelector('.text__hashtags') !== document.activeElement && document.querySelector('.text__description') !== document.activeElement) {
        el.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
        imgPreview.src = '';
        uploadInput.value = '';
      }
      document.querySelector('#success').classList.add('hidden');
    }
  });
  document.removeEventListener('keydown', addEscHandler);
};

const expandPicture = (el) => {
  el.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  removeClassByPrefix(imgPreview, 'effects__preview');
  scaleValue.value = '100%';
  previewPicture.style.filter = 'none';
  imgPreview.style.transform = 'scale(1)';
  addEscHandler(uploadOverlay);
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
  document.removeEventListener('keydown', addEscHandler);
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

const addUploadHandler = () => {
  uploadInput.addEventListener ('change', () => {
    const [file] = uploadInput.files;
    if (file) {
      imgPreview.src = URL.createObjectURL(file);
    }

    expandPicture(uploadOverlay);

    addClickHandler(uploadOverlay);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text__item', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__text__item__error' // Класс для элемента с текстом ошибки
});

const hashSame = () => {
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  for (let i = 0; i < newHash.length-1; i++) {
    newHash[i].toLowerCase();
    for (let j = i+1; j < newHash.length; j++){
      if (newHash[i] === newHash[j]){
        return false;
      }
    }
  }
  return true;
};

const hashLength = () => {
  const newHash = document.querySelector ('.text__hashtags').value.trim().split(' ');
  return (newHash.length <= 5);
};

const hashExpression = () => {
  const re = new RegExp('(#)([А-яA-z0-9]{1,19})');
  let newHash = document.querySelector ('.text__hashtags').value;
  if (newHash !== '') {
    newHash = newHash.trim().split(' ');
    for (let i = 0; i < newHash.length; i++) {
      if (!re.test(newHash[i])){
        return false;
      }
    }
  }
  return true;
};

const validateComment = (value) => value.length <= 140;

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


export {setUserFormSubmit, showAlert, addUploadHandler};
