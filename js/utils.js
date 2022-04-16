const removeClassByPrefix = (el, prefix) => {
  const regx = new RegExp(`\\b${prefix}.*$\\b`,'g');
  el.className = el.className.replace(regx, '');
  return el;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {removeClassByPrefix, debounce, isEscapeKey};


