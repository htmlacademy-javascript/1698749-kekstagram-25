import {debounce} from './utils.js';

const list = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();


const addPictures = (newTestData) => {
  newTestData.slice()
    .forEach((item) => {
      const picture = newPictureTemplate.cloneNode(true);
      const pictureImg = picture.querySelector('.picture__img');
      const pictureLikes = picture.querySelector('.picture__likes');
      const pictureComments = picture.querySelector('.picture__comments');
      picture.dataset.id = item.id;
      pictureImg.src = item.url;
      pictureLikes.textContent = item.likes;
      pictureComments.textContent = item.comments.length;
      similarListFragment.innerHTML = '';
      similarListFragment.appendChild(picture);
    });
  list.appendChild(similarListFragment);
};

const addFilterClickHandler = (pictures) => {
  let processChange = debounce(() => addPictures(pictures));
  const buttonDefault = document.querySelector('#filter-default');
  const buttonRandom = document.querySelector('#filter-random');
  const buttonDiscussed = document.querySelector('#filter-discussed');
  buttonDefault.addEventListener('click', () => {
    processChange = debounce(() => addPictures(pictures));
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    buttonDefault.classList.add ('img-filters__button--active');
    buttonRandom.classList.remove ('img-filters__button--active');
    buttonDiscussed.classList.remove ('img-filters__button--active');
    processChange (pictures.sort((a, b) => a.id - b.id));
  });
  buttonRandom.addEventListener('click', () => {
    const slicePart = 10;
    processChange = debounce(() => addPictures(pictures.slice(0,slicePart)));
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    buttonDefault.classList.remove ('img-filters__button--active');
    buttonRandom.classList.add ('img-filters__button--active');
    buttonDiscussed.classList.remove ('img-filters__button--active');
    processChange (pictures.sort(() => Math.random() - 0.5));
  });
  buttonDiscussed.addEventListener('click', () => {
    processChange = debounce(() => addPictures(pictures));
    const element = document.querySelectorAll('.pictures .picture');
    element.forEach((el) => {
      el.remove();
    });
    buttonDefault.classList.remove ('img-filters__button--active');
    buttonRandom.classList.remove ('img-filters__button--active');
    buttonDiscussed.classList.add ('img-filters__button--active');
    processChange(pictures.sort((a, b) => b.likes - a.likes));
  });
};

export {addFilterClickHandler, addPictures};
