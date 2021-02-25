import React from 'react'
import { NavLink } from "react-router-dom";

export const AuthForm = props => {

  return(
    <form className="auth" onSubmit={props.onSubmit}>
      <h2 className="auth__title">{props.title}</h2>
      <input type="text" name='email' onChange={props.onChange} className="auth__input" placeholder='Email' required={true}/>
      <input type="password" name='password' onChange={props.onChange} className="auth__input" placeholder='Пароль' required={true}/>
      <button  className="auth__button">{props.button}</button>
      {props.register?
        <div className="auth__redirect">
          <p className="auth__redirect-text">Уже зарегистрированы?</p>
          <NavLink to='/signin' className="auth__redirect-button">Войти</NavLink>
        </div>
        :null
      }
    </form>
  )
}