import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");

    this._submitButton = form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.value;
  }

  //Get form values
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }

  //Reset listeners
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  //Close popup
  close() {
    super.close();
    this._form.reset();
  }

  //Warn about loading
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.value = "Сохранение...";
    } else {
      this._submitButton.value = this._submitButtonText;
    }
  }
}
