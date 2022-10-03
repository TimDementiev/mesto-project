//Popup zoom
const popupZoom = document.querySelector(".popup_type_zoom");
const popupZoomImage = popupZoom.querySelector(".popup__image");
const popupZoomCaption = popupZoom.querySelector(".popup__image-caption");
import {openPopup} from './modal.js';

//Zoom popup
export function openZoomPopup(image, caption) {
  popupZoomImage.src = image;
  popupZoomImage.alt = caption;
  popupZoomCaption.textContent = caption;
  openPopup(popupZoom);
}
