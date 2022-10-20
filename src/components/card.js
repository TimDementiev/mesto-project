export default class Card {
  constructor(
    { data, handleZoom, handleLike, handleDelete },
    cardSelector,
    userId,
    api
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleZoom = handleZoom;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
    return cardElement;
  }



}

import { openZoomPopup } from "../utils/utils.js";
import { userId } from "../pages/index.js";

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
