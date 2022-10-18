import "./index.css";
export let userId;

import {
  profilePopup,
  profilePopupName,
  profilePopupBio,
  profileEditButton,
  profileName,
  profileBio,
  popupAvatar,
  popupAvatarLink,
  avatarImage,
  avatarEditButton,
  apiConfig,
  validationSelectors,
} from "../utils/constants.js";

import {
  cardPopup,
  cardAddButton,
  cardPopupInputLink,
  cardPopupInputPlace,
  cardsContainer,
  addCard,
  createCard,
  addInitialCards,
} from "../components/Card.js";

import {
  openPopup,
  closePopup,
  closeAnyPopup,
  renderLoading,
} from "../components/modal.js";

import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";

// Api
const api = new Api(apiConfig);

// Validation
const profilePopupValidator = new FormValidator(
  validationSelectors,
  profilePopup
);
profilePopupValidator.enableValidation();
const cardPopupValidator = new FormValidator(validationSelectors, cardPopup);
cardPopupValidator.enableValidation();





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
    postNewCard(cardPopupInputPlace.value, cardPopupInputLink.value)
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
        closePopup(cardPopup);
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
function opencardPopup() {
  openPopup(cardPopup);
}
function handleOpencardPopup() {
  cardAddButton.addEventListener("click", opencardPopup);
}
function handleSubmitcardPopup() {
  cardPopup.addEventListener("submit", createNewCard);
}
handleOpencardPopup();
handleSubmitcardPopup();

//Modals
function openProfilePopup() {
  profilePopupName.value = profileName.textContent;
  profilePopupBio.value = profileBio.textContent;
  openPopup(profilePopup);
}
function saveprofilePopup(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true, false);
  patchProfileInfo(profilePopupName.value, profilePopupBio.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(evt.target, false, false);
    });
}
function handleOpenprofilePopup() {
  profileEditButton.addEventListener("click", openProfilePopup);
}
function handleSubmitprofilePopup() {
  profilePopup.addEventListener("submit", saveprofilePopup);
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
handleOpenprofilePopup();
handleSubmitPopupAvatar();
handleSubmitprofilePopup();
closeAnyPopup();


