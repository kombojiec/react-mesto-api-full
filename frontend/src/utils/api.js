class Api {
  constructor() {
    this._url = 'https://api.kombojiec.students.nomoreparties.space';
    this._jwt = localStorage.getItem('jwt');
    this._authorization = `Bearer ` + this._jwt;
  }

  //Метод проверки статуса
  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  //Получение данных пользователя
  getUser() {
    return fetch(this._url + '/users/me', {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._checkResponse(res));
  }

  // Установка данных пользователя
  setUser(data){
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => this._checkResponse(res));
  }

  // Получение массива карточек
  getCards() {
    return fetch(this._url + '/cards', {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._checkResponse(res));
  }

  // Добавлнение новой карточки
  addCard(name, link, currentUser){
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
        owner: currentUser._id,
      })
    })
    .then(res => this._checkResponse(res));
  }


  // Удаление карточки
  removeCard(id){
    console.log(id)
    console.log(this._authorization)
    return fetch(this._url + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => this._checkResponse(res));
  }

  // Добавление лайка
  addLike(id){
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => this._checkResponse(res));
  }

  // Удаление лайка
  removeLike(id){    
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
    })
    .then(res => this._checkResponse(res));
  }

  // Изменение лайка
  changeLikeCardStatus(id, bool){
    if(bool){
      return this.addLike(id);
    }else{
      return this.removeLike(id);
    }
  }

  // Смена аватара
  changeAvatar(url){
    return fetch(this._url + '/users/me/avatar' , {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json',
      },      
      body: JSON.stringify({
        avatar: url,
      })
    })
    .then(res => this._checkResponse(res));
  }  

}


const api = new Api();
export default api;
