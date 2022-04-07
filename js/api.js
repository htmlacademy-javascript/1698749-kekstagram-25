import {addBigPicture} from './full-pictures.js';

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

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((newTestData) => {
      onSuccess(newTestData);
      const currentPictures = document.querySelectorAll ('.picture');
      addBigPicture (newTestData, currentPictures);
    })
    .catch((error) => {
      showAlert(`Что-то пошло не так: ${error}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
