//POPUP OPEN/CLOSE
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");
const profileAddButton = profile.querySelector(".profile__add-button");

const popup = document.querySelector(".popup");
const popupHeading = popup.querySelector(".form__heading");
const popupFirstLine = popup.querySelector("#form-first-line");
const popupSecondLine = popup.querySelector("#form-second-line");
const popupButtonClose = popup.querySelector(".popup__button-close");
const popupButtonHandle = popup.querySelector(".form__button-handle");

let formReason = "";

//console.log();

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

//NEW CARD ADDITION
const elementsItemList = document.querySelector(".elements__item-list");
const elementsImage = elementsItemList.querySelector(".elements__image");
const elementsTitle = elementsItemList.querySelector(".elements__title");

function addCard(elementsImage, elementsTitle) {
  const cardTemplate = elementsItemList.querySelector(
    "#elements__template"
  ).content;
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".elements__image").src = elementsImage;
  cardElement.querySelector(".elements__title").textContent = elementsTitle;
  elementsItemList.prepend(cardElement);
}

profileAddButton.addEventListener("click", function (evt) {
  formReason = "card";
  evt.target.classList.toggle("1");
  popup.classList.add("popup_opened");
  popupHeading.textContent = "Новое место";
  popupFirstLine.setAttribute("value", "");
  popupSecondLine.setAttribute("value", "");
  popupFirstLine.setAttribute("placeholder", "Название");
  popupSecondLine.setAttribute("placeholder", "Ссылка на картинку");
  popupButtonHandle.setAttribute("value", "Создать");
});

//INITIAL CARDS ADDITION
function initialCardsFunc(elementsImage, elementsTitle) {
  for (let i = 0; i < initialCards.length; i++) {
    const cardTemplate = elementsItemList.querySelector(
      "#elements__template"
    ).content;
    const cardElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);
    cardElement.querySelector(".elements__image").src = initialCards[i].link;
    cardElement.querySelector(".elements__title").textContent =
      initialCards[i].name;
    elementsItemList.append(cardElement);
  }
}

initialCardsFunc(initialCards);

//PROFILE EDITION
profileEditButton.addEventListener("click", function () {
  formReason = "profile";
  popup.classList.add("popup_opened");

  console.log(profileName.textContent);
  console.log(profileBio.textContent);
  popupFirstLine.value = profileName.textContent;
  popupSecondLine.value = profileBio.textContent;
  popupHeading.textContent = "Редактировать профиль";
  popupFirstLine.setAttribute("placeholder", "Имя");
  popupSecondLine.setAttribute("placeholder", "О себе");
  popupButtonHandle.setAttribute("value", "Сохранить");
});

//POPUP CLOSURE
popupButtonClose.addEventListener("click", function () {
  popupHeading.textContent = "";
  popupFirstLine.setAttribute("placeholder", "");
  popupSecondLine.setAttribute("placeholder", "");
  popupFirstLine.value = '';
  popupSecondLine.value = '';
  popup.classList.remove("popup_opened");
  formReason = "";
});

//FORM HANDLER
function formSubmitHandler(evt) {
  evt.preventDefault();
  switch (formReason) {
    case "card":
      addCard(popupSecondLine.value, popupFirstLine.value);
      break;
    case "profile":
      profileName.textContent = popupFirstLine.value;
      profileBio.textContent = popupSecondLine.value;
      break;
   // default:
   //   catName = "Леопольд";
  }
  popupHeading.textContent = "";
  popupFirstLine.setAttribute("placeholder", "");
  popupSecondLine.setAttribute("placeholder", "");
  popupFirstLine.value = '';
  popupSecondLine.value = '';
  popup.classList.remove("popup_opened");
  formReason = "";
}

popup.addEventListener("submit", formSubmitHandler);

//LIKE
/* const likeButton = document.querySelector('.elements__like');
button.addEventListener("click", function (event) {

  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
});*/
