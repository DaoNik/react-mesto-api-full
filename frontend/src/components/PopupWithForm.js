import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__btn popup__btn-add">
            {submitButtonText}
          </button>
        </form>
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

export default PopupWithForm;
