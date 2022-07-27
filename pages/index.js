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
const cardTemplateItem = cardList.querySelector(".elements__item");
const cardTemplateImage = cardList.querySelector(".elements__image");
const cardTemplateTitle = cardList.querySelector(".elements__title");

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

//Functions

//Open popup
function openPopup(i) {
  i.classList.add("popup_opened");
}

//Close popup
function closePopup(i) {
  i.classList.remove("popup_opened");
}

//Profile edit button
function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  openPopup(popupProfile);
}

//Card adding button
function openPopupCard() {
  popupCardInputPlace.value = "";
  popupCardInputLink.value = "";
  openPopup(popupCard);
}

//Close button
// function closePopup(evt) {

// }
// popupCloseButton.addEventListener("click", openPopupCard);

popupCloseButton.forEach((i) =>
  i.addEventListener("click", (evt) => closePopup(evt.target.closest(".popup")))
);

//Popup card create
function createPopupCard(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addCard(popupCardInputPlace.value, popupCardInputLink.value);
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
  // const removedCard = evt.target;
  evt.target.classList.toggle(".elements__like_active");
}

//Card zoom
function openCardZoom(evt) {
  const zoomedCard = evt.target.parentElement;
  const zoomedCardImage = evt.target;
  const zoomedCardCaption = zoomedCard.nextElementSibling.firstElementChild;

  popupZoomImage.src = zoomedCardImage.src;
  popupZoomImage.alt = zoomedCardCaption.textContent;
  popupZoomCaption.textContent = zoomedCardCaption.textContent;
  openPopup(popupZoom);
}

//Create card
function createCard(cardImage, cardTitle) {
  const cardElement = cardTemplateItem.cloneNode(true);
  cardElement.querySelector(".elements__title").textContent = cardTitle;
  const cardImage = cardElement.querySelector(".elements__title");
  cardImage.src = cardImage;
  cardImage.alt = cardTitle;
  cardImage.addEventListener("click", openCardZoom);
  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".elements__remove")
    .addEventListener("click", removeCard);

  return cardElement;
}

//Add initial cards
function addInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i].link, initialCards[i].name);
  }
}

elementsItemList.append(cardElement);

/*
//NEW CARD ADDITION
function addCard(cardTemplateImage, cardTemplateTitle) {
  const cardElement = cardTemplate
  .querySelector(".elements__item")
  .cloneNode(true);
  cardElement.querySelector(".elements__image").src = cardTemplateImage;
  cardElement.querySelector(".elements__image").alt = cardTemplateTitle;
  cardElement.querySelector(".elements__title").textContent = cardTemplateTitle;
  elementsItemList.prepend(cardElement);
}
*/
//LIKE
/*
function likeToggle() {
  const likeButton = cardElement.querySelector(".elements__like");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__like_active");
  });
}
likeToggle();
*/

//Remove card
// function removeCard() {
//   const removeButton = cardElement.querySelector(".elements__remove");

//   removeButton.addEventListener("click", function (evt) {
//     const removedCard = evt.target.closest(".elements__item");
//     removedCard.remove();
//   });
// }
// removeCard();

//Popup zoom opening
/*
function openPopupZoom() {
  const zoomButtonOpen = cardElement.querySelector(".elements__button-zoom");
  zoomButtonOpen.addEventListener("click", function (evt) {
    openPopup(popupZoom);

    const zoomedCardImg = evt.target;
    popupZoomImage.src = zoomedCardImg.src;
    const zoomedCard = evt.target.parentElement;
    const zoomedCardCaption = zoomedCard.nextElementSibling.firstElementChild;
    popupZoomCaption.textContent = zoomedCardCaption.textContent;
  });
}


openPopupZoom();
*/

addInitialCards(initialCards);
cardAddButton.addEventListener("click", openPopupCard);
profileEditButton.addEventListener("click", openPopupProfile);
popupProfile.addEventListener("submit", savePopupProfile);
popupCard.addEventListener("submit", createPopupCard);
