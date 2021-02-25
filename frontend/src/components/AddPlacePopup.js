import React,{useState} from 'react';
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = (props) =>{

  const [name, setName] = useState('');
  const [link, setlink] = useState('');

  const handleInputPlace = (event)=>{
    setName(event.target.value);
  }

  const handleInputSource = (event)=>{
    setlink(event.target.value);
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    props.onChangeButton('Loading...');
    props.onAddPlace({name, link})
    event.target.reset()
  } 

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOutsideClose={props.onOutsideClose} 
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      title='Новое место'  
      name='form_card' 
      buttonName="Создать"
    >
      <input type="text" className="popup__input popup__input_place_place-name" name="card-name" id="card-name" placeholder="Название" minLength="2" maxLength="30" required onChange={handleInputPlace} />
      <label className="popup__input-error" htmlFor="card-name" id="card-name-error"></label>
      <input type="url" className="popup__input popup__input_place_source" name="card-sourse" id="card-sourse" placeholder="Ссылка на картинку" required onChange={handleInputSource} />
      <label className="popup__input-error" htmlFor="card-sourse" id="card-sourse-error"></label>            
    </PopupWithForm>
  )
}

export default AddPlacePopup