import React from  'react';
import popup_positive from '../images/popup_positive.svg'
import popup_negative from '../images/popup_negative.svg'

const InfoTooltip = (props) => {
  
  return(
    <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onOutsideClose}>
      <form className="popup__form popup__form_type_auth" >
        {props.result?
        <>
          <img src={props.result === 'success'? popup_positive: popup_negative} alt="Результат" className="popup__mark"/>
          <h2 className="popup__title popup__title_type_auth">
            {props.result === 'success'? 
              'Вы успешно зарегистрировались!':
              'Что-то пошло не так! Попробуйте ещё раз.'
            } 
          </h2>
          </>:
        null
        }
        <button className="popup__close" type="button" onClick={props.onClose} />
      </form>
    </section>
  )
};

export default InfoTooltip;