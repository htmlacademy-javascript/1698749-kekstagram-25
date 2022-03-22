import {getRandomArrayElement, getRandomInt} from './utils.js';


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

const description = [
  'Прекрасное фото',
  'Неплохой вид открывается',
  'Сам бы лучше не сделал',
  'Горизонт завален',
];

function generateComment (numberOfComments) {
  const comments = [];
  for (let i = 1; i < numberOfComments + 1; i++) {
    comments.push ({id: i,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(messages),
      name:  getRandomArrayElement(authors)
    });
  }
  return {
    comments
  };
}
export {generateComment};


function generateTestData (numberOfData = 25) {
  const testData = [];
  for (let i = 1; i < numberOfData + 1; i++) {
    testData.push({ id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(description),
      likes: getRandomInt(15, 200),
      comments: generateComment(getRandomInt(1,5))
    });
  }
  return {
    testData
  };
}

export {generateTestData};
