const modalPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector ('.social__comments');
const newCommentTemplate = document.querySelector ('#comment').content;

const addEscHandler =  (el) => {
  addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') {
      el.classList.add('hidden');}
  });
};

const expandPicture = (el) => {
  el.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const addClickHandler = (el) => {
  const closeButton = el.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    el.classList.add('hidden');
  });
};


function addBigPicture (newTestData, currentPictures) {
  currentPictures.forEach((item) => {
    item.addEventListener ('click', () => {

      //Отправляем данные из маленькой картинки в модалку
      const pictureLikes = item.querySelector ('.picture__likes').textContent;
      const pictureComments = item.querySelector ('.picture__comments').textContent;
      const pictureSrc = item.querySelector ('.picture__img').src;
      const modalPictureImg = modalPicture.querySelector ('.big-picture__img img');
      const modalPictureComments = modalPicture.querySelector ('.comments-count');
      const modalPictureLikes = modalPicture.querySelector ('.likes-count');
      modalPictureImg.src = pictureSrc;
      modalPictureLikes.textContent = pictureLikes;
      modalPictureComments.textContent = pictureComments;

      //добавляем описание к изображению
      const currentData = newTestData.testData[item.dataset.id-1];
      const pictureDescr = modalPicture.querySelector('.social__caption');
      pictureDescr.textContent = currentData.description;

      //очищаем комменатрии по умолчанию
      commentsList.innerHTML = '';

      //добавляем комментарии к изображению
      currentData.comments.comments.forEach((dataComment) => {
        const newComment = newCommentTemplate.cloneNode(true);
        const comment = newComment.querySelector('img');
        const commentText = newComment.querySelector ('p');
        commentText.textContent = dataComment.message;
        comment.src = dataComment.avatar;
        comment.alt = dataComment.name;
        commentsList.appendChild(newComment);
      });

      const allComments = document.querySelectorAll('.social__comment');
      //Скрываем комментарии до 5
      for (let i=0; i < allComments.length ; i++ ) {
        if  (i >= 5) {
          allComments[i].classList.add('hidden');
        }
      }
      let visibleComments = document.querySelectorAll('.social__comments li:not(.hidden)');

      //Считаем количество комменатриев
      const commentButton = document.querySelector('.comments-loader');
      const allCommentCnt = document.querySelector('.comments-count');
      const visibleCommentCnt = document.querySelector('.comments-count-visible');
      visibleCommentCnt.textContent = visibleComments.length;
      allCommentCnt.textContent = allComments.length;

      if (allComments.length === visibleComments.length) {
        commentButton.classList.add ('hidden');
      }

      const addCommentClickHandler = () => {
        commentButton.addEventListener('click', () => {
          let someCounter = '';
          if (allComments.length >= visibleComments.length + 5) {
            someCounter = 5;
          }
          else {
            someCounter = allComments.length - visibleComments.length;
          }
          for (let i=1; i < visibleComments.length + someCounter; i++) {
            allComments[i].classList.remove('hidden');
          }
          visibleComments = document.querySelectorAll('.social__comments li:not(.hidden)');
          visibleCommentCnt.textContent = visibleComments.length;
          if (allComments.length === visibleComments.length) {
            commentButton.classList.add ('hidden');
          }
        });
      };

      addEscHandler(modalPicture);

      expandPicture(modalPicture);

      addClickHandler(modalPicture);

      addCommentClickHandler();
    });
  });
}

export {addBigPicture};
