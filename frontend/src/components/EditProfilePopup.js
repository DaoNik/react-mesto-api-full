import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonText={"Сохранить"}
    >
      <input
        className="popup__input popup__input_value_name"
        id="name"
        name="name"
        type="text"
        placeholder="Никнейм"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error" id="name-error"></span>
      <input
        className="popup__input popup__input_value_job"
        id="job"
        name="job"
        type="text"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
