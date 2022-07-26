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
const elementsItemList = document.querySelector(".elements__item-list");
const cardTemplate = document.querySelector("#elements__template").content;
const elementsImage = elementsItemList.querySelector(".elements__image");
const elementsTitle = elementsItemList.querySelector(".elements__title");
const zoom = document.querySelector(".zoom");
const zoomButtonClose = zoom.querySelector(".zoom__button-close");
const zoomImage = zoom.querySelector(".zoom__image");
const zoomCaption = zoom.querySelector(".zoom__caption");
let formReason = "";
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

function addInitialCards(elementsImage, elementsTitle) {
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);
    cardElement.querySelector(".elements__image").src = initialCards[i].link;
    cardElement.querySelector(".elements__image").alt = initialCards[i].name;
    cardElement.querySelector(".elements__title").textContent =
      initialCards[i].name;
    elementsItemList.append(cardElement);

    //LIKE
    function toggleLike() {
      const likeButton = cardElement.querySelector(".elements__like");
      likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });
    }
    toggleLike();

    //REMOVE
    function removeCard() {
      const removeButton = cardElement.querySelector(".elements__remove");
      removeButton.addEventListener("click", function (evt) {
        const removedCard = evt.target.closest(".elements__item");
        removedCard.remove();
      });
    }
    removeCard();

    //ZOOM OPENING
    function openZoom() {
      const zoomButtonOpen = cardElement.querySelector(
        ".elements__button-zoom"
      );
      zoomButtonOpen.addEventListener("click", function (evt) {
        zoom.classList.add("zoom_opened");
        const zoomedCardImg = evt.target;
        zoomImage.src = zoomedCardImg.src;
        const zoomedCard = evt.target.parentElement;
        const zoomedCardCaption =
          zoomedCard.nextElementSibling.firstElementChild;
        zoomCaption.textContent = zoomedCardCaption.textContent;
      });
    }
    openZoom();

    //ZOOM CLOSURE
    function closeZoom() {
      zoomButtonClose.addEventListener("click", function () {
        zoom.classList.remove("zoom_opened");
      });
    }
    closeZoom();
  }
}
addInitialCards(initialCards);

//NEW CARD ADDITION
function addCard(elementsImage, elementsTitle) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  cardElement.querySelector(".elements__image").src = elementsImage;
  cardElement.querySelector(".elements__image").alt = elementsTitle;
  cardElement.querySelector(".elements__title").textContent = elementsTitle;
  elementsItemList.prepend(cardElement);

  //LIKE
  function likeToggle() {
    const likeButton = cardElement.querySelector(".elements__like");
    likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
  }
  likeToggle();

  //REMOVE
  function removeCard() {
    const removeButton = cardElement.querySelector(".elements__remove");
    removeButton.addEventListener("click", function (evt) {
      const removedCard = evt.target.closest(".elements__item");
      removedCard.remove();
    });
  }
  removeCard();

  //ZOOM OPENING
  function openZoom() {
    const zoomButtonOpen = cardElement.querySelector(".elements__button-zoom");
    zoomButtonOpen.addEventListener("click", function (evt) {
      zoom.classList.add("zoom_opened");
      const zoomedCardImg = evt.target;
      zoomImage.src = zoomedCardImg.src;
      const zoomedCard = evt.target.parentElement;
      const zoomedCardCaption = zoomedCard.nextElementSibling.firstElementChild;
      zoomCaption.textContent = zoomedCardCaption.textContent;
    });
  }
  openZoom();

  //ZOOM CLOSURE
  function closeZoom() {
    zoomButtonClose.addEventListener("click", function () {
      zoom.classList.remove("zoom_opened");
    });
  }
  closeZoom();
}

profileAddButton.addEventListener("click", function () {
  formReason = "card";
  popup.classList.add("popup_opened");
  popupHeading.textContent = "Новое место";
  popupFirstLine.setAttribute("value", "");
  popupSecondLine.setAttribute("value", "");
  popupFirstLine.setAttribute("placeholder", "Название");
  popupSecondLine.setAttribute("placeholder", "Ссылка на картинку");
  popupButtonHandle.setAttribute("value", "Создать");
});

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
  popupFirstLine.value = "";
  popupSecondLine.value = "";
  popup.classList.remove("popup_opened");
  formReason = "";
});

//FORM HANDLER
function handleSubmitForm(evt) {
  evt.preventDefault();
  switch (formReason) {
    case "card":
      addCard(popupSecondLine.value, popupFirstLine.value);
      break;
    case "profile":
      profileName.textContent = popupFirstLine.value;
      profileBio.textContent = popupSecondLine.value;
      break;
  }
  popupFirstLine.value = "";
  popupSecondLine.value = "";
  popup.classList.remove("popup_opened");
  formReason = "";
}
popup.addEventListener("submit", handleSubmitForm);

