//POPUP OPEN/CLOSE
const profile = document.querySelector(".profile");
const popup = document.querySelector(".popup");
const editButton = profile.querySelector(".profile__edit-button");
const popupButtonClose = popup.querySelector(".popup__button-close");


editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
});

popupButtonClose.addEventListener("click", function () {
  popup.classList.remove('popup_opened');
});


//LIKE
const likeButton = document.querySelector('.elements__like');
button.addEventListener("click", function (event) {

  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
});


//NEW CARD ADDITION
const userTemplate = document.querySelector("#user").content;
const usersOnline = document.querySelector(".users-online");

// клонируем содержимое тега template
const userElement = userTemplate.querySelector(".user").cloneNode(true);

// наполняем содержимым
userElement.querySelector(".user__avatar").src = "tinyurl.com/v4pfzwy";
userElement.querySelector(".user__name").textContent = "Дюк Корморант";

// отображаем на странице
usersOnline.append(userElement);
