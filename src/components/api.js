const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "f196cf19-dd04-45f0-9b1d-22e68e70536c",
    "Content-Type": "application/json",
  },
};

function specifyRequest(method, way, body = "") {
  const inputs = {
    method: method,
    headers: config.headers,
  };
  if (method != "GET" && body) inputs.body = JSON.stringify(body);
  return fetch(`${config.baseUrl}${way}`, inputs)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

export const getProfileInfo = () => {
  return specifyRequest("GET", "/users/me");
};

export const renderCards = () => {
  return specifyRequest("GET", "/cards");
};

export const patchProfileInfo = (name, about) => {
  return specifyRequest("PATCH", "/users/me", {
    name: name,
    about: about,
  });
};

export const patchProfileAvatar = (avatar) => {
  return specifyRequest("PATCH", "/users/me/avatar", {
    avatar: avatar,
  });
};

export const postNewCard = (name, link) => {
  return specifyRequest("POST", "/cards", {
    name: name,
    link: link,
  });
};

export const deleteCard = (cardId) => {
  return specifyRequest("DELETE", `/cards/${cardId}`);
};

export const likeCard = (cardId) => {
  return specifyRequest("PUT", `/cards/likes/${cardId}`);
};

export const unlikeCard = (cardId) => {
  return specifyRequest("DELETE", `/cards/likes/${cardId}`);
};
