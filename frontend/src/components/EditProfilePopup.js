import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) =>{

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(()=>{
      setName(currentUser.name);
      setDescription(currentUser.about);
  },[props.isOpen, currentUser])

  const handleNameChange = (event => {
    setName(event.target.value)
  })
  const handleDescriptionChange = (event => {
    setDescription(event.target.value);
  })

  function handleSubmit(event){
    event.preventDefault();
    props.onChangeButton('Loading...');
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return(
    <PopupWithForm 
      isOpen={props.isOpen} 
      isLoading={props.isLoading}
      onClose={props.onClose} 
      onOutsideClose={props.onOutsideClose} 
      title={'Редактировать профиль'} name='form_profile' 
      buttonName='Сохранить' onSubmit={handleSubmit} >
      <input type="text" className="popup__input popup__input_place_name" name="name" id="edit-name" minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange}/>
      <label className="popup__input-error" htmlFor="edit-name" id="edit-name-error"></label>
      <input type="text" className="popup__input popup__input_place_business" name="about" id="edit-business" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange} />
      <label className="popup__input-error" htmlFor="edit-business" id="edit-business-error"></label>
    </PopupWithForm>
  )

}

export default EditProfilePopup;