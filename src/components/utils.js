//Popup zoom
const popupZoom = document.querySelector(".popup_type_zoom");
const popupZoomImage = popupZoom.querySelector(".popup__image");
const popupZoomCaption = popupZoom.querySelector(".popup__image-caption");


//Open popup
export function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
}

//Close popup
export function closePopup(targetPopup) {
  targetPopup.classList.remove("popup_opened");
}

//Zoom popup
export function openZoomPopup(image, caption) {
  popupZoomImage.src = image;
  popupZoomImage.alt = caption;
  popupZoomCaption.textContent = caption;
  openPopup(popupZoom);
}
