//POPUP OPEN/CLOSE
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");

const popup = document.querySelector(".popup");
const popupName = popup.querySelector("#profile-name");
const popupBio = popup.querySelector("#profile-bio");
const popupButtonClose = popup.querySelector(".popup__button-close");
const popupButtonSave = popup.querySelector(".form__button-save");



profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
  popupName.setAttribute('value', profileName.textContent);
  popupBio.setAttribute('value', profileBio.textContent);
});

popupButtonClose.addEventListener("click", function () {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileBio.textContent = popupBio.value;
  popup.classList.remove('popup_opened');
};

popup.addEventListener('submit', formSubmitHandler);

//songElement.querySelector('.song__artist').textContent = artistValue;

//LIKE
/* const likeButton = document.querySelector('.elements__like');
button.addEventListener("click", function (event) {

  const eventTarget = evt.target;
  eventTarget.setAttribute("disabled", true);
});
*/

//NEW CARD ADDITION
/*const userTemplate = document.querySelector("#user").content;
const usersOnline = document.querySelector(".users-online");

// клонируем содержимое тега template
const userElement = userTemplate.querySelector(".user").cloneNode(true);

// наполняем содержимым
userElement.querySelector(".user__avatar").src = "tinyurl.com/v4pfzwy";
userElement.querySelector(".user__name").textContent = "Дюк Корморант";

// отображаем на странице
usersOnline.append(userElement);
*/
