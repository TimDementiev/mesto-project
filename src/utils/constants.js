//Profile
export const profilePopup = document.querySelector(".popup_type_profile");
export const profilePopupName = profilePopup.querySelector("#form-input-profile-name");
export const profilePopupBio = profilePopup.querySelector("#form-input-profile-bio");
export const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileBio = profile.querySelector(".profile__bio");

//Avatar
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupAvatarLink = popupAvatar.querySelector("#form-input-avatar-link");
export const avatarImage = profile.querySelector(".profile__image");
export const avatarEditButton = profile.querySelector(".profile__image-overlay");

//Card
export const cardsContainer = document.querySelector(".elements__item-list");
export const cardTemplate = document.querySelector("#elements__template").content;
export const cardAddButton = profile.querySelector(".profile__add-button");
export const cardPopup = document.querySelector(".popup_type_card");
export const cardPopupInputPlace = cardPopup.querySelector("#form-input-card-place");
export const cardPopupInputLink = cardPopup.querySelector("#form-input-card-link");

//Popup
//export const popupCloseButton = document.querySelectorAll(".popup__button-close");
//export const popups = document.querySelectorAll(".popup");
//export const cardPopupSubmit = cardPopup.querySelector(".form__submit");


//Api
export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "f196cf19-dd04-45f0-9b1d-22e68e70536c",
    "Content-Type": "application/json",
  },
};

//Validation
export const validationSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
