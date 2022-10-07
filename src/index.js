import "./index.css";
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector("#form-input-profile-name");
const popupProfileBio = popupProfile.querySelector("#form-input-profile-bio");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileBio = profile.querySelector(".profile__bio");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarLink = popupAvatar.querySelector("#form-input-avatar-link");
export const avatarImage = profile.querySelector(".profile__image");
const avatarEditButton = profile.querySelector(".profile__image-overlay");
import {
  popupCard,
  cardAddButton,
  popupCardInputLink,
  popupCardInputPlace,
  cardsContainer,
  addCard,
  createCard,
  openPopupCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeAnyPopup,
  renderLoading,
} from "./components/modal.js";
import { enableValidation, toggleButtonState } from "./components/validate.js";
import {
  getProfileInfo,
  renderCards,
  patchProfileInfo,
  patchProfileAvatar,
  postNewCard,
} from "./components/api.js";

//Profile
getProfileInfo();

// Cards
function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);
  closePopup(popupCard);
  addCard(
    postNewCard(popupCardInputPlace.value, popupCardInputLink.value),
    cardsContainer
  );
  evt.target.reset();
  const inputList = Array.from(evt.target.querySelectorAll(".form__input"));
  const buttonElement = evt.target.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement, "form__submit_inactive");
}
function handleSubmitPopupCard() {
  popupCard.addEventListener("submit", createNewCard);
}
function handleOpenPopupCard() {
  cardAddButton.addEventListener("click", openPopupCard);
}
renderCards();
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
  renderLoading(true);
  patchProfileInfo(popupProfileName.value, popupProfileBio.value);
  closePopup(popupProfile);
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
  renderLoading(true);
  patchProfileAvatar(popupAvatarLink.value);
  closePopup(popupAvatar);
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
