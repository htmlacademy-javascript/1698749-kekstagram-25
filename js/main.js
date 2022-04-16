import {addPictures, addFilterClickHandler} from'./pictures.js';
import {setUserFormSubmit} from './form.js';
import {addUploadHandler} from './form.js';
import {changeUp} from './customize.js';
import {getData} from './api.js';

const uploadInput = document.querySelector ('#upload-file');

getData(addPictures);
addUploadHandler(uploadInput);
setUserFormSubmit();
changeUp ();
addFilterClickHandler();
getData(addPictures);
