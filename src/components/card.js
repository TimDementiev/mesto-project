export default class Card {
  constructor(
    { data, handleCardClick, handleCardLike, handleCardRemove },
    cardSelector,
    userId,
    api
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardRemove = handleCardRemove;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._api = api;

    this._cardElement = this._getTemplate();
    this._cardImageItem = this._cardElement.querySelector(".elements__image");
    this._cardRemoveButton =
      this._cardElement.querySelector(".elements__remove");
    this._cardLikeButton = this._cardElement.querySelector(".elements__like");
    this._cardLikes = this._cardElement.querySelector(
      ".elements__like-counter"
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  _checkCardOwner() {
    if (this._cardOwnerId === this._userId) {
      this._cardRemoveButton.classList.add("elements__remove_active");
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleCardLike(this)
    );
    this._cardRemoveButton.addEventListener("click", () =>
      this._handleCardRemove(this)
    );
    this._cardImageItem.addEventListener("click", () =>
      this._handleCardClick()
    );
  }

  _toggleLike() {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("element__button_active");
    } else {
      this._cardLikeButton.classList.remove("element__button_active");
    }
  }

  likeCard(likes) {
    this._likeCount.textContent = likes.length;
    this._like = likes;
    this._toggleLike();
  }

  removeCard() {
    this._cardElement.remove();
    //this._cardElement = null;
  }

  generateCard() {
    this._checkCardOwner();
    this._setEventListeners();
    this.toggleLike();
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._cardLikes.textContent = this._likes.length;
    this._cardImageItem.src = this._link;
    this._cardImageItem.alt = this._name;
    return this._cardElement;
  }
}

//////////////////////////////////////////////////////////

// import { openZoomPopup } from "../utils/utils.js";
// import { userId } from "../pages/index.js";

// //Card remove
// function removeCard(cardId, removedCard) {
//   deleteCard(cardId)
//     .then(() => removedCard.remove())
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     });
// }

// //Create card
// export function createCard(
//   cardImage,
//   cardCaption,
//   likesArray,
//   cardId,
//   cardOwner
// ) {
//   const cardElement = cardTemplate
//     .querySelector(".elements__item")
//     .cloneNode(true);
//   const cardImageItem = cardElement.querySelector(".elements__image");
//   const cardRemoveButton = cardElement.querySelector(".elements__remove");
//   const cardLikeButton = cardElement.querySelector(".elements__like");
//   const cardTitle = cardElement.querySelector(".elements__title");
//   const cardLikes = cardElement.querySelector(".elements__like-counter");

//   cardTitle.textContent = cardCaption;
//   cardLikes.textContent = likesArray.length;
//   cardImageItem.src = cardImage;
//   cardImageItem.onload = cardImage;
//   cardImageItem.alt = cardCaption;
//   //Filter only own cards for removing
//   if (cardOwner._id === userId) {
//     cardRemoveButton.classList.add("elements__remove_active");
//     const removedCard = cardRemoveButton.closest(".elements__item");
//     cardRemoveButton.addEventListener("click", () =>
//       removeCard(cardId, removedCard)
//     );
//   }
//   //Set initial status of own likes
//   if (
//     likesArray.some(function (item) {
//       return item._id === userId;
//     })
//   ) {
//     cardLikeButton.classList.add("elements__like_active");
//   }
//   cardLikeButton.addEventListener("click", () => {
//     const likedCard = cardLikeButton.classList.contains("elements__like_active")
//       ? unlikeCard(cardId)
//       : likeCard(cardId);
//     likedCard
//       .then((result) => {
//         cardLikes.textContent = result.likes.length;
//         cardLikeButton.classList.toggle("elements__like_active");
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       });
//   });

//   cardImageItem.addEventListener("click", () =>
//     openZoomPopup(cardImage, cardCaption)
//   );
//   return cardElement;
// }

// //Add initial cards
// export function addInitialCards(array) {
//   array.forEach((item) =>
//     addCard(
//       createCard(item.link, item.name, item.likes, item._id, item.owner),
//       cardsContainer
//     )
//   );
// }

// //New card addition
// export function addCard(cardElement, cardsContainer) {
//   cardsContainer.append(cardElement);
// }
