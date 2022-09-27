// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector(".form");
// const formInput = formElement.querySelector(".form__item"); //del
// const formError = formElement.querySelector(`.${formInput.id}-error`); //del

//
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  // console.log("showInputError");
};

//
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
  // console.log("hideInputError");
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  // if (inputElement.validity.valueMissing) {
  //   inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  // } else {
  //   inputElement.setCustomValidity("");
  // }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  // console.log("isValid");
};

// Функция, которая
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some

  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
    console.log(`hasInvalidInput = ${!inputElement.validity.valid}`);
    return !inputElement.validity.valid;
  });
};

// Функция, которая
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    console.log("toggleButtonState=disabled");
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // иначе сделай кнопку активной
    console.log("toggleButtonState=enabled");
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

// Функция, которая
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".form__submit");
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
  // console.log("setEventListeners");
};

// Функция, которая
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
  // console.log("enableValidation");
};
enableValidation();
