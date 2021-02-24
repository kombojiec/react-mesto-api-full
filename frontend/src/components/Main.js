import React, {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext'

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      {/* <!--=================Profile=================== --> */}
      <section className="profile">
        <div className="profile__items">
          <div className="profile__avatar-wrap" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__author">
              <div className="profile__name-wrap">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="button profile__edit-button" type="button" onClick={props.onEditProfile} ></button>
              </div>              
                <p className="profile__business">{currentUser.about}</p>
            </div>            
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* <!--=================Elements=================== --> */}
      <section className="elements">     
        {props.cards.map((card) => {
          return (
            <Card 
              key={card._id} card={card} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )    
        })}
      </section>        
    </main>  
  )
};

export default Main;