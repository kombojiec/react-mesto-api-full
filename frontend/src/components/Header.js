import React, {useState} from 'react';
import logo from '../images/logo.svg';
import {withRouter, useHistory} from 'react-router-dom'

const Header = (props) => {

  const [page, setPage] = useState('/signin')

  const pathname = useHistory().location.pathname;
  let buttonText = '';
  if(pathname === '/signup'){
    buttonText = 'Войти'
  }else if(pathname === '/signin'){
    buttonText = 'Регистрация'
  }

  const redirectToSignIn = () => {
    setPage('/signin')
    props.history.push('/signup')
  }
  const redirectToSignUp = () => {
    setPage('/signup')
    props.history.push('/signin')
  }

  const redirectButton = () => {
    if(page === '/signin'){
      redirectToSignUp();
      return
    }
    redirectToSignIn();
  }

  return(
    <header className="header">
      <img src={logo} alt="Логотип" className="header__Logo" />      
      {props.mail?
        <div className="header__info">
          <p className="header__mail">{props.mail}</p>
          <button className ='header__button' onClick={props.onLogOut}>Выйти</button>
        </div>:
        <button className ='header__button' onClick={redirectButton} >{buttonText}</button>
      }
    </header>
  )
};

export default withRouter(Header);