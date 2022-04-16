import '../nouislider/nouislider.js';
import {removeClassByPrefix} from './utils.js';

const previewPicture = document.querySelector('.img-upload__preview');
const previewPictureImg = previewPicture.querySelector ('.img-upload__preview img');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const styleButtons = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
slider.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 10,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const configChrome = {
  range: {
    min: 0,
    max: 10,
  },
  step: 1
};

const configSepia = {
  orientation: 'horizontal',
  start: 10,
  range: {
    min: 0,
    max: 10,
  },
  connect: 'lower',
  step: 1
};

const configInvert = {
  orientation: 'horizontal',
  start: 100,
  range: {
    min: 0,
    max: 100,
  },
  connect: 'lower',
  step: 1
};

const configBlur = {
  orientation: 'horizontal',
  start: 3,
  range: {
    min: 0,
    max: 3,
  },
  connect: 'lower',
  step: 0.1
};

const configBrightness = {
  orientation: 'horizontal',
  start: 3,
  range: {
    min: 1,
    max: 3,
  },
  connect: 'lower',
  step: 0.1,
};

const addClickHandlerStyles = () => {
  styleButtons.forEach((item) => {
    const currentEffectName= item.id.replace('effect-', '');
    item.addEventListener('click', () => {
      switch (currentEffectName) {
        case 'none':
          previewPicture.style.filter = 'none';
          break;
        case 'chrome':
          sliderElement.noUiSlider.updateOptions(configChrome);
          break;
        case 'sepia':
          sliderElement.noUiSlider.updateOptions(configSepia);
          break;
        case 'marvin':
          sliderElement.noUiSlider.updateOptions(configInvert);
          break;
        case 'phobos':
          sliderElement.noUiSlider.updateOptions(configBlur);
          break;
        case 'heat':
          sliderElement.noUiSlider.updateOptions(configBrightness);
          previewPicture.style.filter = `brightness(${valueElement.value})`;
          break;
      }
      removeClassByPrefix(previewPictureImg, 'effects__preview');
      previewPictureImg.classList.add(`effects__preview--${currentEffectName}`);
      if (previewPictureImg.classList.contains('effects__preview--none')) {
        slider.classList.add('hidden');
      }
      else {
        slider.classList.remove('hidden');
        sliderElement.noUiSlider.on('update', () => {
          valueElement.value = sliderElement.noUiSlider.get();
          switch (currentEffectName) {
            case 'chrome':
              previewPicture.style.filter = `grayscale(${valueElement.value/10})`;
              break;
            case 'sepia':
              previewPicture.style.filter = `sepia(${valueElement.value/10})`;
              break;
            case 'marvin':
              previewPicture.style.filter = `invert(${valueElement.value/100})`;
              break;
            case 'phobos':
              previewPicture.style.filter = `blur(${valueElement.value}px)`;
              break;
            case 'heat':
              previewPicture.style.filter = `brightness(${valueElement.value})`;
              break;
          }
        });
      }
    });
  });
};


scaleValue.value = '100%';
let currentValue = parseInt(scaleValue.value, 10)/100;
previewPictureImg.style.transform = `scale(${currentValue})`;

const addClickHandlerBigger = () => {
  biggerButton.addEventListener('click', () => {
    if (currentValue !== 1) {
      currentValue = currentValue + 0.25;
      previewPictureImg.style.transform = `scale(${currentValue})`;
      scaleValue.value = `${currentValue*100} %`;
    }
  });
};

const addClickHandlerSmaller = () => {
  smallerButton.addEventListener('click', () => {
    if (currentValue !== 0.25) {
      currentValue = currentValue - 0.25;
      previewPictureImg.style.transform = `scale(${currentValue})`;
      scaleValue.value = `${currentValue*100} %`;
    }
  });
};

const changeUp = () => {
  addClickHandlerBigger();
  addClickHandlerSmaller();

  addClickHandlerStyles();
};

export {changeUp};


