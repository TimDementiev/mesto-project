export const profilePopup = document.querySelector(".popup_type_profile");
export const profilePopupName = profilePopup.querySelector(
  "#form-input-profile-name"
);
export const profilePopupBio = profilePopup.querySelector(
  "#form-input-profile-bio"
);
export const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileName = profile.querySelector(".profile__name");
export const profileBio = profile.querySelector(".profile__bio");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupAvatarLink = popupAvatar.querySelector(
  "#form-input-avatar-link"
);
export const avatarImage = profile.querySelector(".profile__image");
export const avatarEditButton = profile.querySelector(
  ".profile__image-overlay"
);

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "f196cf19-dd04-45f0-9b1d-22e68e70536c",
    "Content-Type": "application/json",
  },
};

export const validationSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
