export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //Open popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", _handleEscClose);
  }

  //Close popupd
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", _handleEscClose);
  }

  //Keydown handler
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Close any popup func
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
    this._popup
      .querySelectorAll(".popup__button-close")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
