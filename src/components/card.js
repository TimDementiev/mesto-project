export const initialCards = [
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
//Card
export const cardsContainer = document.querySelector(".elements__item-list");
const cardTemplate = document.querySelector("#elements__template").content;
const profile = document.querySelector(".profile");
export const cardAddButton = profile.querySelector(".profile__add-button");
//Popup card
export const popupCard = document.querySelector(".popup_type_card");
export const popupCardInputPlace = popupCard.querySelector("#form-input-card-place");
export const popupCardInputLink = popupCard.querySelector("#form-input-card-link");
import {openPopup} from './modal.js';
import {openZoomPopup} from './utils.js';


//Card adding button
export function openPopupCard() {
  openPopup(popupCard);
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

//Create card
export function createCard(placeImage, placeCaption) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".elements__title").textContent = placeCaption;
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = placeImage;
  cardImage.alt = placeCaption;
  cardImage.addEventListener("click", () =>
    openZoomPopup(placeImage, placeCaption)
  );
  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", removeCard);
  return cardElement;
}

//Add initial cards
export function addInitialCards(array) {
  array.forEach((item) => addCard(createCard(item.link, item.name), cardsContainer));
}

//New card addition
export function addCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}




