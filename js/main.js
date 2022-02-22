function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt();

function getCommentLenght (comment, maxLenght = 140) {
  return !(comment.length > maxLenght);
} // Результат: true, если строка проходит по длине, и false — если не проходит. Длина комментария по умолчанию не может составлять больше 140 символов;

getCommentLenght('randomtext');
