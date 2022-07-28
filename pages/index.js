const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Profile
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");
const cardAddButton = profile.querySelector(".profile__add-button");

//Card
const cardList = document.querySelector(".elements__item-list");
const cardTemplate = document.querySelector("#elements__template").content;

//Popup common
const popupHeading = document.querySelector(".form__heading");
const popupCloseButton = document.querySelectorAll(".popup__button-close");

//Popup profile
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector("#form-input-name");
const popupProfileBio = popupProfile.querySelector("#form-input-bio");
const popupProfileSubmit = popupProfile.querySelector(".form__button-handle");

//Popup card
const popupCard = document.querySelector(".popup_type_card");
const popupCardInputPlace = popupCard.querySelector("#form-input-place");
const popupCardInputLink = popupCard.querySelector("#form-input-link");
const popupCardSubmit = popupCard.querySelector(".form__button-handle");

//Popup zoom
const popupZoom = document.querySelector(".popup_type_zoom");
const popupZoomImage = popupZoom.querySelector(".popup__image");
const popupZoomCaption = popupZoom.querySelector(".popup__image-caption");

//Functions:

//Open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Profile edit button
function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  openPopup(popupProfile);
}

//Card adding button
function openPopupCard() {
  openPopup(popupCard);
}

//Close button
function closeAnyPopup() {
  popupCloseButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
}

//Popup card create
function createNewCard(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addCard(
    createCard(popupCardInputLink.value, popupCardInputPlace.value),
    cardList
  );
  evt.target.reset();
}

//Popup profile save
function savePopupProfile(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
}

//Card remove
function removeCard(evt) {
  const removedCard = evt.target.closest(".elements__item");
  removedCard.remove();
}

//Card like
function likeCard(evt) {
  evt.target.classList.toggle("elements__like_active");
}

//Card zoom
function handleCardClick(image,caption) {
  popupZoomImage.src = image;
  popupZoomImage.alt = caption;
  popupZoomCaption.textContent = caption;
  openPopup(popupZoom);
}

//Create card
function createCard(placeImage, placeCaption) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".elements__title").textContent = placeCaption;
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = placeImage;
  cardImage.alt = placeCaption;
  //сardImage.addEventListener("click", openCardZoom);
  cardImage.addEventListener('click', () => handleCardClick(placeImage, placeCaption));

  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", likeCard);

  cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", removeCard);

  return cardElement;
}

//Add initial cards
function addInitialCards(array) {
  array.forEach((item) => addCard(createCard(item.link, item.name), cardList));
}

//New card addition
function addCard(cardElement, cardList) {
  cardList.prepend(cardElement);
}

addInitialCards(initialCards);
closeAnyPopup();
cardAddButton.addEventListener("click", openPopupCard);
profileEditButton.addEventListener("click", openPopupProfile);
popupProfile.addEventListener("submit", savePopupProfile);
popupCard.addEventListener("submit", createNewCard);
