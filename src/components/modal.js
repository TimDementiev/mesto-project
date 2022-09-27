//Popup common
const popups = document.querySelectorAll(".popup");
const popupHeading = document.querySelector(".form__heading");
const popupCloseButton = document.querySelectorAll(".popup__button-close");

//Popup profile
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileName = popupProfile.querySelector("#form-input-profile-name");
const popupProfileBio = popupProfile.querySelector("#form-input-profile-bio");
const popupProfileSubmit = popupProfile.querySelector(".form__submit-handle");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");

//Popup zoom
const popupZoom = document.querySelector(".popup_type_zoom");
const popupZoomImage = popupZoom.querySelector(".popup__image");
const popupZoomCaption = popupZoom.querySelector(".popup__image-caption");

//Popup avatar
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarLink = popupAvatar.querySelector("#form-input-avatar-link");
const avatarImage = document.querySelector(".profile__image");
const avatarEditButton = profile.querySelector(".profile__image-overlay");

//Open popup
function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
}

//Close popup
function closePopup(targetPopup) {
  targetPopup.classList.remove("popup_opened");
}

//Close any popup
function closeAnyPopup() {
  popupCloseButton.forEach((button) => {
    const openedPopup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(openedPopup));
  });
  popups.forEach((popup) => {
    popup.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
      }
    });
  });
  document.addEventListener("keydown", function (evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape" && popup) {
      closePopup(openedPopup);
    }
  });
}

//Popup profile
function openProfilePopup() {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  openPopup(popupProfile);
}

function savePopupProfile(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
}

//Zoom popup
function openZoomPopup(image, caption) {
  popupZoomImage.src = image;
  popupZoomImage.alt = caption;
  popupZoomCaption.textContent = caption;
  openPopup(popupZoom);
}

//Avatar popup
function openAvatarPopup() {
  popupAvatarLink.value = avatarImage.getAttribute("src");
  openPopup(popupAvatar);
}

function saveAvatarPopup(evt) {
  evt.preventDefault();
  closePopup(popupAvatar);
  avatarImage.setAttribute("src", popupAvatarLink.value);
}

avatarEditButton.addEventListener("click", openAvatarPopup);
popupAvatar.addEventListener("submit", saveAvatarPopup);
profileEditButton.addEventListener("click", openProfilePopup);
popupProfile.addEventListener("submit", savePopupProfile);
closeAnyPopup();
