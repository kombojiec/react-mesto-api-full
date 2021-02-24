import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) =>{

  const inputRef = useRef();

  function handleSubmit(event){
    event.preventDefault();
    props.onChangeButton('Loading...');
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }
  
  return(
    <PopupWithForm 
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onOutsideClose={props.onOutsideClose}
      onSubmit={handleSubmit}
      title={'Обновить аватар'} name='avatar' buttonName='Сохранить'>
      <input ref={inputRef} type="url" className="popup__input popup__input_place_avatar" name="avatar-sourse" id="avatar-sourse" placeholder="https://somewebsite.com/someimage.jpg" required />
      <label className="popup__input-error" htmlFor="avatar-sourse" id="avatar-sourse-error"></label
    >
    </PopupWithForm>
  )
}

export default EditAvatarPopup