import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'


const Card = (props) =>{

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__basket ${isOwn? 
    '' :
    'element__basket_hiden'}`
  )
  const isLiked = props.card.likes.some(like => like._id === currentUser._id)
  const cardLikeButtonClassName = `element__like ${isLiked? 'element__like_active': ''}`;
  const handleClick = ()=>{
    props.onCardClick(props.card);
  };
  const handleLikeCard = () =>{
    props.onCardLike(props.card)
  }
  const handleDeleteClick = () =>{
    props.onCardDelete(props.card._id);
  }


  return(
    <article className="element">
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeCard}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      </div>
    </article>
  )
};

export default Card;