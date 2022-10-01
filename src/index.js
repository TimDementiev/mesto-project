import "./index.css";

// Cards
import {
  initialCards,
  addInitialCards,
  handleOpenPopupCard,
  handleSubmitPopupCard
} from "./components/card.js";
addInitialCards(initialCards);
handleOpenPopupCard();
handleSubmitPopupCard();

//Modals
import {
  handleOpenPopupAvatar,
  handleOpenPopupProfile,
  handleSubmitPopupAvatar,
  handleSubmitPopupProfile,
  closeAnyPopup,
} from "./components/modal.js";
handleOpenPopupAvatar();
handleOpenPopupProfile();
handleSubmitPopupAvatar();
handleSubmitPopupProfile();
closeAnyPopup();

// Validation
import { enableValidation } from "./components/validate.js";
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
