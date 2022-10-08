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
export let userId;
import {
  popupCard,
  cardAddButton,
  popupCardInputLink,
  popupCardInputPlace,
  cardsContainer,
  addCard,
  createCard,
  addInitialCards,
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

//Get initial data
Promise.all([getProfileInfo(), renderCards()])
  .then(([InitialProfile, InitialCards]) => {
    userId = InitialProfile._id;
    profileName.textContent = InitialProfile.name;
    profileBio.textContent = InitialProfile.about;
    avatarImage.setAttribute("src", InitialProfile.avatar);
    addInitialCards(InitialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Cards
function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, true);
  addCard(
    postNewCard(popupCardInputPlace.value, popupCardInputLink.value)
      .then((result) => {
        cardsContainer.prepend(
          createCard(
            result.link,
            result.name,
            result.likes,
            result._id,
            result.owner
          )
        );
        closePopup(popupCard);
        evt.target.reset();
        toggleButtonState(
          Array.from(evt.target.querySelectorAll(".form__input")),
          evt.target.querySelector(".form__submit"),
          "form__submit_inactive"
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        renderLoading(evt.target, false, true);
      }),
    cardsContainer
  );
}
function openPopupCard() {
  openPopup(popupCard);
}
function handleOpenPopupCard() {
  cardAddButton.addEventListener("click", openPopupCard);
}
function handleSubmitPopupCard() {
  popupCard.addEventListener("submit", createNewCard);
}
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
  renderLoading(evt.target, true, false);
  patchProfileInfo(popupProfileName.value, popupProfileBio.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(evt.target, false, false);
    });
}
function handleOpenPopupProfile() {
  profileEditButton.addEventListener("click", openProfilePopup);
}
function handleSubmitPopupProfile() {
  popupProfile.addEventListener("submit", savePopupProfile);
}
function openAvatarPopup() {
  openPopup(popupAvatar);
}
function saveAvatarPopup(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, false);
  patchProfileAvatar(popupAvatarLink.value)
    .then((result) => {
      avatarImage.setAttribute("src", result.avatar);
      closePopup(popupAvatar);
      evt.target.reset();
      toggleButtonState(
        Array.from(evt.target.querySelectorAll(".form__input")),
        evt.target.querySelector(".form__submit"),
        "form__submit_inactive"
      );
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(evt.target, false, false);
    });
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
