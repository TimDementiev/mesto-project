const popupCloseButton = document.querySelectorAll(".popup__button-close");
const popups = document.querySelectorAll(".popup");
import { toggleButtonState } from "./validate.js";

const handleKeydown = function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

//Open popup
export function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeydown);
}

//Close popupd
export function closePopup(targetPopup) {
  targetPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeydown);
}

//Close any popup func
export function closeAnyPopup() {
  popupCloseButton.forEach((button) => {
    const openedPopup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(openedPopup));
  });
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
      }
    });
  });
}
