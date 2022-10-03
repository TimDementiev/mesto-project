import "./index.css";
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector("#form-input-profile-name");
const popupProfileBio = popupProfile.querySelector("#form-input-profile-bio");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarLink = popupAvatar.querySelector("#form-input-avatar-link");
const avatarImage = profile.querySelector(".profile__image");
const avatarEditButton = profile.querySelector(".profile__image-overlay");
import {
  initialCards,
  popupCard,
  cardAddButton,
  popupCardInputLink,
  popupCardInputPlace,
  cardsContainer,
  addInitialCards,
  addCard,
  createCard,
  openPopupCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeAnyPopup
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

// Cards
function createNewCard(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addCard(
    createCard(popupCardInputLink.value, popupCardInputPlace.value),
    cardsContainer
  );
  evt.target.reset();
}
function handleSubmitPopupCard() {
  popupCard.addEventListener("submit", createNewCard);
}
function handleOpenPopupCard() {
  cardAddButton.addEventListener("click", openPopupCard);
}
addInitialCards(initialCards);
handleOpenPopupCard();
handleSubmitPopupCard();

//Modals
function openProfilePopup() {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  openPopup(popupProfile);
}
function savePopupProfile(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
}
function handleOpenPopupProfile() {
  profileEditButton.addEventListener("click", openProfilePopup);
}
function handleSubmitPopupProfile() {
  popupProfile.addEventListener("submit", savePopupProfile);
}
function openAvatarPopup() {
  popupAvatarLink.value = avatarImage.getAttribute("src");
  openPopup(popupAvatar);
}
function saveAvatarPopup(evt) {
  evt.preventDefault();
  closePopup(popupAvatar);
  avatarImage.setAttribute("src", popupAvatarLink.value);
}
function handleOpenPopupAvatar() {
  avatarEditButton.addEventListener("click", openAvatarPopup);
}
function handleSubmitPopupAvatar() {
  popupAvatar.addEventListener("submit", saveAvatarPopup);
}
handleOpenPopupAvatar();
handleOpenPopupProfile();
handleSubmitPopupAvatar();
handleSubmitPopupProfile();
closeAnyPopup();

// Validation
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});

