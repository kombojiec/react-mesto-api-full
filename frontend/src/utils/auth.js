export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export const registration = (email, password) => {
  return fetch(`${BASE_URL}/signup`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => checkResponse(res))
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => checkResponse(res))
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`,{
    method: 'get',
    headers:{
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    } 
  })
  .then(res => checkResponse(res))
}