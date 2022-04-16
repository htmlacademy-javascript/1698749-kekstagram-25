import {debounce} from './utils.js';
import {getData} from './api.js';

const list = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();
const debounceTimeOut = 500;

const addPictures = (newTestData) => {
  newTestData.slice()
    .forEach((item) => {
      const picture = newPictureTemplate.cloneNode(true);
      const pictureImg = picture.querySelector('.picture__img');
      const pictureLikes = picture.querySelector('.picture__likes');
      const pictureComments = picture.querySelector('.picture__comments');
      if (picture.dataset.id !== '') {
        picture.dataset.id = item.id;
      }
      pictureImg.src = item.url;
      pictureLikes.textContent = item.likes;
      pictureComments.textContent = item.comments.length;
      similarListFragment.innerHTML = '';
      similarListFragment.appendChild(picture);
    });
  list.appendChild(similarListFragment);
};

const addFilterClickHandler = () => {
  const buttonDefault = document.querySelector('#filter-default');
  const buttonRandom = document.querySelector('#filter-random');
  const buttonDiscussed = document.querySelector('#filter-discussed');
  buttonDefault.addEventListener('click', () => {
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    const processChange = debounce(() => getData(addPictures, 'default'), debounceTimeOut);
    processChange();
    buttonDefault.classList.add ('img-filters__button--active');
    buttonRandom.classList.remove ('img-filters__button--active');
    buttonDiscussed.classList.remove ('img-filters__button--active');
  });
  buttonRandom.addEventListener('click', () => {
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    const processChange = debounce(() => getData(addPictures, 'random'), debounceTimeOut);
    processChange();
    buttonDefault.classList.remove ('img-filters__button--active');
    buttonRandom.classList.add ('img-filters__button--active');
    buttonDiscussed.classList.remove ('img-filters__button--active');
  });
  buttonDiscussed.addEventListener('click', () => {
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    const processChange = debounce(() => getData(addPictures, 'discussed'), debounceTimeOut);
    processChange();
    buttonDefault.classList.remove ('img-filters__button--active');
    buttonRandom.classList.remove ('img-filters__button--active');
    buttonDiscussed.classList.add ('img-filters__button--active');
  });
};

export {addPictures, addFilterClickHandler};
