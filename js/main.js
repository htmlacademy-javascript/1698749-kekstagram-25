
function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt();

function getCommentLenght (text, maxLenght = 140) {
  return text.length <= maxLenght;
} // Результат: true, если строка проходит по длине, и false — если не проходит. Длина комментария по умолчанию не может составлять больше 140 символов;

getCommentLenght('randomtext');

function getRandomArrayElement (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const authors = [
  'Артём',
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

function generateComment (numberOfComments) {
  let comments = [];
  for (let i=1; i<numberOfComments+1; i++) {
    comments = comments.concat({ id: i,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(messages),
      name:  getRandomArrayElement(authors)
    });
  }
  return {
    comments
  };
}


function generateTestData (numberOfData) {
  let testData = [];
  for (let i=1; i<numberOfData+1; i++) {
    testData = testData.concat({   id: i,
      url: `photos/${i}.jpg`,
      description: 'тестовое описание для тестов',
      likes: getRandomInt(15, 200),
      comments: generateComment(getRandomInt(1,5))
    });
  }
  return {
    testData
  };
}

generateTestData (25);
