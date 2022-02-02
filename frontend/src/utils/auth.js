export const BASE_URL = 'https://api.pro100grog.students.nomoredomains.work';

function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Произошла ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    return checkRequest(response);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => checkRequest(response))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);

        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkRequest(res))
    .then((data) => data);
};
