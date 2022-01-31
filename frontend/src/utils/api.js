class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject('Произошла ошибка');
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  addNewUserInfo(name, description) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  addCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  addNewCard({ name, link, likes } /*, renderCreating, button*/) {
    // renderCreating(true, button);
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        likes: likes,
      }),
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  updateAvatar(avatar /*, renderSaving, button*/) {
    // renderSaving(true, button);
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  addLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkRequest(res);
    });
  }

  deleteCard(cardId /*renderDeleting, button*/) {
    // renderDeleting(true, button);
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkRequest(res);
    });
  }
}

export default new Api({
  url: 'http://localhost:3001/',
  headers: {
    // authorization: "965be665-caac-4684-953a-3ef75da5404d",
    'Content-Type': 'application/json',
  },
});
