import {generateTestData} from './data.js';
import {addPictures} from'./pictures.js';
import {addBigPicture} from './full-pictures.js';
import {addUploadHandler} from './form.js';
import {ChangeUp} from './customize.js';

const newTestData = generateTestData(25);
addPictures (newTestData);
const currentPictures = document.querySelectorAll ('.picture');
addBigPicture (newTestData, currentPictures);
addUploadHandler();
ChangeUp ();
