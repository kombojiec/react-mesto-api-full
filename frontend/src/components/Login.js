import React,{ useState } from "react";
import {AuthForm} from "./AuthForm";
import { withRouter } from "react-router-dom";

const Login = props => {

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  
  const inputHandler = (event) => {
    const {name, value} = event.target;
    setData({
      ...data,
      [name]: value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogInUser(data)
  }

  return (
    <div className='page_type_auth' >
      <div className="page__container">

      <AuthForm 
        onChange={inputHandler}
        onSubmit={submitHandler}
        title='Вход'
        button='Войти'
        register={false}
      />
      </div>
    </div>
  )
}

export default withRouter(Login);