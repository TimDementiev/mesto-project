//Popup common
const popups = document.querySelectorAll(".popup");
const popupCloseButton = document.querySelectorAll(".popup__button-close");
//Popup profile
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector("#form-input-profile-name");
const popupProfileBio = popupProfile.querySelector("#form-input-profile-bio");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");
//Popup avatar
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarLink = popupAvatar.querySelector("#form-input-avatar-link");
const avatarImage = document.querySelector(".profile__image");
const avatarEditButton = profile.querySelector(".profile__image-overlay");
import { openPopup, closePopup } from "./utils.js";

//Profile popup funcs
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
export function handleOpenPopupProfile() {
  profileEditButton.addEventListener("click", openProfilePopup);
}
export function handleSubmitPopupProfile() {
  popupProfile.addEventListener("submit", savePopupProfile);
  // popupProfile.addEventListener("keydown", function (evt) {
  //   // const openedPopup = document.querySelector(".popup_opened");
  //   console.log (evt.key);
  //   if (evt.key === "Enter") {
  //     savePopupProfile;
  //   }
  // });
}

//Avatar popup funcs
function openAvatarPopup() {
  popupAvatarLink.value = avatarImage.getAttribute("src");
  openPopup(popupAvatar);
}
function saveAvatarPopup(evt) {
  evt.preventDefault();
  closePopup(popupAvatar);
  avatarImage.setAttribute("src", popupAvatarLink.value);
}
export function handleOpenPopupAvatar() {
  avatarEditButton.addEventListener("click", openAvatarPopup);
}
export function handleSubmitPopupAvatar() {
  popupAvatar.addEventListener("submit", saveAvatarPopup);
  // popupAvatar.addEventListener("keydown", function (evt) {
  //   // const openedPopup = document.querySelector(".popup_opened");
  //   if (evt.key === "Enter") {
  //     saveAvatarPopup;
  //   }
  // });
}

//Close any popup func
export function closeAnyPopup() {
  popupCloseButton.forEach((button) => {
    const openedPopup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(openedPopup));
  });
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
      }
    });
  });
  document.addEventListener("keydown", function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && openedPopup) {
      closePopup(openedPopup);
    }
  });
}
