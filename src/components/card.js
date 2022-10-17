import { openZoomPopup } from "./utils.js";
import { likeCard, unlikeCard, deleteCard } from "./api.js";
import { userId } from "./../index.js";
//Card
export const cardsContainer = document.querySelector(".elements__item-list");
const cardTemplate = document.querySelector("#elements__template").content;
const profile = document.querySelector(".profile");
export const cardAddButton = profile.querySelector(".profile__add-button");
//Popup card
export const cardPopup = document.querySelector(".popup_type_card");
export const cardPopupInputPlace = cardPopup.querySelector(
  "#form-input-card-place"
);
export const cardPopupInputLink = cardPopup.querySelector(
  "#form-input-card-link"
);

//Card remove
function removeCard(cardId, removedCard) {
  deleteCard(cardId)
    .then(() => removedCard.remove())
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//Create card
export function createCard(
  cardImage,
  cardCaption,
  likesArray,
  cardId,
  cardOwner
) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const cardImageItem = cardElement.querySelector(".elements__image");
  const cardRemoveButton = cardElement.querySelector(".elements__remove");
  const cardLikeButton = cardElement.querySelector(".elements__like");
  const cardTitle = cardElement.querySelector(".elements__title");
  const cardLikes = cardElement.querySelector(".elements__like-counter");

  cardTitle.textContent = cardCaption;
  cardLikes.textContent = likesArray.length;
  cardImageItem.src = cardImage;
  cardImageItem.onload = cardImage;
  cardImageItem.alt = cardCaption;
  //Filter only own cards for removing
  if (cardOwner._id === userId) {
    cardRemoveButton.classList.add("elements__remove_active");
    const removedCard = cardRemoveButton.closest(".elements__item");
    cardRemoveButton.addEventListener("click", () =>
      removeCard(cardId, removedCard)
    );
  }
  //Set initial status of own likes
  if (
    likesArray.some(function (item) {
      return item._id === userId;
    })
  ) {
    cardLikeButton.classList.add("elements__like_active");
  }

  cardLikeButton.addEventListener("click", () => {
    const likedCard = cardLikeButton.classList.contains("elements__like_active")
      ? unlikeCard(cardId)
      : likeCard(cardId);
    likedCard
      .then((result) => {
        cardLikes.textContent = result.likes.length;
        cardLikeButton.classList.toggle("elements__like_active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });

  cardImageItem.addEventListener("click", () =>
    openZoomPopup(cardImage, cardCaption)
  );
  return cardElement;
}

//Add initial cards
export function addInitialCards(array) {
  array.forEach((item) =>
    addCard(
      createCard(item.link, item.name, item.likes, item._id, item.owner),
      cardsContainer
    )
  );
}

//New card addition
export function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement);
}
