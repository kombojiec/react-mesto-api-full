
import React,{ useState } from "react";
import {AuthForm} from "./AuthForm";
import {withRouter } from "react-router-dom";


const Register = (props) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    message: '',
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
    props.onRegUser(data)
  }

  return (
    <div className='page_type_auth' >
      <div className="page__container">  
      <AuthForm 
        onChange={inputHandler}
        onSubmit={submitHandler}
        title='Регистрация'
        button='Зарегистрироваться'
        register={true}
      />
      </div>
    </div>
  )
}

export default  withRouter(Register)