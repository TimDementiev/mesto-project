import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomImage = document.querySelector(".popup__image");
    this._popupZoomCaption = document.querySelector(".popup__image-caption");
  }

  //Open popup
  open(data) {
    super.open();
    this._popupZoomImage.src = data.link;
    this._popupZoomImage.alt = data.name;
    this._popupZoomCaption.textContent = data.name;
  }
}
