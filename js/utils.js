
function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export {getRandomInt};


function getCommentLenght (text, maxLenght = 140) {
  return text.length <= maxLenght;
}
export {getCommentLenght};

function getRandomArrayElement (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
}
export {getRandomArrayElement};