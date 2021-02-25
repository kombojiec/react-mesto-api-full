
const ImagePopup = (props) => {
    return(
      <section className={`popup popup_image popup_dark ${props.isOpen? 'popup_opened': ""}`} onClick={props.onOutsideClose}>
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link}
                alt={props.card.name} />
          <button className="popup__close popup__close_place_image" type="button" onClick={props.onClose}></button>
          <figcaption className="popup__figcaption">{props.card.name}</figcaption>
        </figure>
      </section>
    )  
};

export default ImagePopup;