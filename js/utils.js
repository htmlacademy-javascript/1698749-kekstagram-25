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

function removeClassByPrefix (el, prefix) {
  const regx = new RegExp(`\\b${prefix}.*$\\b`,'g');
  el.className = el.className.replace(regx, '');
  return el;
}

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement, removeClassByPrefix, debounce};


