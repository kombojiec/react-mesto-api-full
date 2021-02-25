import React from 'react';

const ErrorPopup = (props) => {

  const classes =['popup', 'popup_error'];
  if(props.isOpen){classes.push('popup_opened');}

  return(
    <section className={classes.join(' ')} onClick={props.onOutsideClose}>
      <div className="popup__fault" >
        <h2 className="popup__title">Что-то пошло не так...</h2>          
        <p className="popup__text">При отправке данных произошла ошибка&nbsp;
          <span style={{color:'red'}}>{props.error}</span>
        . Проверьте данные или повторите запрос позже.</p>
        <button className="popup__close popup__close_place_error" type="button" onClick={props.onClose}></button>
      </div>
    </section> 
  )
};

export default ErrorPopup;