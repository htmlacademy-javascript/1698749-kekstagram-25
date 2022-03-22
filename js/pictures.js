const list = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

function addPictures (newTestData) {
  newTestData.testData.forEach((item) => {
    const picture = newPictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    const pictureLikes = picture.querySelector('.picture__likes');
    const pictureComments = picture.querySelector('.picture__comments');
    picture.dataset.id = item.id;
    pictureImg.src = item.url;
    pictureLikes.textContent = item.likes;
    pictureComments .textContent = item.comments.comments.length;
    similarListFragment.appendChild(picture);
    list.appendChild(similarListFragment);
  });
}

export {addPictures};
