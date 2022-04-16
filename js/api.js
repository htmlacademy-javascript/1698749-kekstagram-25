import {addBigPicture} from './full-pictures.js';
import {showAlert} from './form.js';

const getData = (onSuccess, howToSort = 'default') => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((newTestData) => {
      const fullTestData = newTestData.slice();
      switch (howToSort) {
        case 'default':
          newTestData = newTestData.sort((a, b) => a.id - b.id);
          break;
        case 'random':
          newTestData = newTestData.sort(() => Math.random() - 0.5).slice(0, 10);
          break;
        case 'discussed':
          newTestData = newTestData.sort((a, b) => b.comments.length - a.comments.length);
          break;}
      onSuccess(newTestData);
      const currentPictures = document.querySelectorAll ('.picture');
      addBigPicture (fullTestData, currentPictures);
      document.querySelector('.img-filters').classList.remove ('img-filters--inactive');
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
