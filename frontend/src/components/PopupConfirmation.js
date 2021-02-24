import React from 'react';

const PopupConfirmation = (props) =>{

  const deleteCard = (event) =>{
    props.onChangeButton('Deleting...')
    props.onDelete(event);
  }
  
  return(
    <section className={`popup popup_remove ${props.isOpen? 'popup_opened': ''}`} onClick={props.onOutsideClose}>
      <form className="popup__form " onSubmit={(event)=>deleteCard(event)}>
        <h2 className="popup__title popup__title_type_dark">Вы уверены?</h2>
        <button className="popup__button popup__button_remove" type="submit" >{props.isLoading? props.isLoading: 'Да'}</button>
        <button className="popup__close popup__close_place_remove" type="button" onClick={props.onClose}></button>
      </form>
     </section>
  )
};

export default PopupConfirmation;

