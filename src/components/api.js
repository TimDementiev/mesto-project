export let updatedLikes;

import { profileName, profileBio, avatarImage } from "./../index.js";
import {
  cardsContainer,
  addInitialCards,
  createCard,
} from "./card.js";
import { renderLoading } from "./modal.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "f196cf19-dd04-45f0-9b1d-22e68e70536c",
    "Content-Type": "application/json",
  },
};

function checkFetchResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkFetchResponse)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
      avatarImage.setAttribute("src", result.avatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const renderCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkFetchResponse)
    .then((result) => {
      // console.log(result);
      addInitialCards(result);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const patchProfileInfo = (patchProfileName, patchProfileBio) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: patchProfileName,
      about: patchProfileBio,
    }),
  })
    .then(checkFetchResponse)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
};

export const patchProfileAvatar = (patchAvatarImage) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: patchAvatarImage,
    }),
  })
    .then(checkFetchResponse)
    .then((result) => {
      avatarImage.setAttribute("src", result.avatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
};

export const postNewCard = (postNewCardName, postNewCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: postNewCardName,
      link: postNewCardLink,
    }),
  })
    .then(checkFetchResponse)
    .then((result) => {
      cardsContainer.prepend(
        createCard(
          result.link,
          result.name,
          result.likes,
          result._id,
          result.owner
        )
      );
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkFetchResponse)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkFetchResponse)
    .then((result) => {
      updatedLikes = result.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkFetchResponse)
    .then((result) => {
      updatedLikes = result.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};
