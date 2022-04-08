import {addPictures} from'./pictures.js';
import {setUserFormSubmit} from './form.js';
import {addUploadHandler} from './form.js';
import {changeUp} from './customize.js';
import {getData} from './api.js';
import {addFilterClickHandler} from './pictures.js';


const uploadInput = document.querySelector ('#upload-file');

addUploadHandler(uploadInput);
setUserFormSubmit();
changeUp ();

getData(addPictures);
getData(addFilterClickHandler);
