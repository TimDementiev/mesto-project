export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
  }

  // Функция, которая показывает сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция, которая скрывает сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция, которая проверяет наличие ошибок в input
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция, которая проверяет статус кнопки submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Функция, которая устанавливает слушатели
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Общая функция валидации
  enableValidation() {
    this._setEventListeners();
  }
}

////////////////////////////////////////////////////////////////////////

// // Функция, которая показывает сообщение об ошибке
// const showInputError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   inputErrorClass,
//   errorClass
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// // Функция, которая скрывает сообщение об ошибке
// const hideInputError = (
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = "";
// };

// // Функция, которая проверяет валидность поля
// const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       inputErrorClass,
//       errorClass
//     );
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// };

// // Функция, которая проверяет наличие ошибок в input
// export const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// // Функция, которая проверяет статус кнопки submit
// export const toggleButtonState = (
//   inputList,
//   buttonElement,
//   inactiveButtonClass
// ) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };

// // Функция, которая устанавливает слушатели
// const setEventListeners = (
//   formElement,
//   inputItem,
//   submitItem,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass
// ) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputItem));
//   const buttonElement = formElement.querySelector(submitItem);
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       isValid(formElement, inputElement, inputErrorClass, errorClass);
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// // Общая функция валидации
// export const enableValidation = (arr) => {
//   const formList = Array.from(document.querySelectorAll(arr.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(
//       formElement,
//       arr.inputSelector,
//       arr.submitButtonSelector,
//       arr.inactiveButtonClass,
//       arr.inputErrorClass,
//       arr.errorClass
//     );
//   });
// };
