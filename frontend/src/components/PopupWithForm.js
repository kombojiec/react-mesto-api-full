import React, {useEffect,useRef} from  'react';

const PopupWithForm = (props) => {

  const form = useRef();

  useEffect(()=>{
    !props.isOpen && form.current.reset();
  },[props.isOpen])  
  
  return(
    <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onOutsideClose}>
      <form ref={form} onSubmit={props.onSubmit} action="#" className="popup__form" noValidate>
        <h2 className="popup__title">{props.title} </h2>
        {props.children}
        <button className="popup__button" type="submit">{props.isLoading? props.isLoading: props.buttonName}</button>
        <button className="popup__close" type="button" onClick={props.onClose} />
      </form>
    </section>
  )
};

export default PopupWithForm;