import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_view ${card.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__view-container">
        <h2 className="popup__view-title">{card.name}</h2>
        <img src={card.link} alt={card.name} className="popup__view-image" />
        <button
          onClick={onClose}
          type="button"
          className="popup__btn-closed"
          aria-label="Кнопка закрытия всплывающего окна"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
