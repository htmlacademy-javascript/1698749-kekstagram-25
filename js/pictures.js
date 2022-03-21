import {generateTestData, generateComment} from './data.js';

const newTestData = generateTestData(25);
generateComment();

const list = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');


const similarListFragment = document.createDocumentFragment();

newTestData.testData.forEach((item) => {
  const picture = newPictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');
  pictureImg.src = item.url;
  pictureLikes.textContent = item.likes;
  pictureComments .textContent = item.comments.comments.length;
  similarListFragment.appendChild(picture);
});

list.appendChild(similarListFragment);
