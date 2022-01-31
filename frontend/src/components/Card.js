import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `gallery__card-btn-trash ${
    isOwn ? '' : 'gallery__card-btn-trash_hidden'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <li className='gallery__card'>
      <h2 className='gallery__card-title'>{card.name}</h2>
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className='gallery__card-img'
      />
      <button
        type='button'
        className={`gallery__card-btn ${
          isLiked ? 'gallery__card-btn_active' : ''
        }`}
        aria-label='Кнопка лайка'
        data-before={card.likes.length}
        onClick={handleLikeClick}
      ></button>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        aria-label='Кнопка удаления карточки'
        onClick={handleDeleteCard}
      ></button>
    </li>
  );
}

export default Card;
