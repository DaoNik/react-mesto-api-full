import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputAvatarLink = React.useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    inputAvatarLink.current.focus();
    props.onUpdateAvatar({
      avatar: inputAvatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonText={"Сохранить"}
    >
      <input
        className="popup__input"
        id="avatar-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        ref={inputAvatarLink}
        required
      />
      <span className="popup__error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
