export const openEditProfileBtn = document.querySelector(
  ".profile__button-edit"
);
export const openedButtonAdd = document.querySelector(".profile__button-add");
export const popupEdit = document.querySelector(".popup_edit");
export const popupAdd = document.querySelector(".popup_add");
export const popupEditForm = popupEdit.querySelector(".popup__form");
export const popupAddForm = popupAdd.querySelector(".popup__form");
export const popupUpdateAvatarForm = document.forms.popupUpdateAvatarForm;
export const nameInput = popupEdit.querySelector(".popup__input_value_name");
export const jobInput = popupEdit.querySelector(".popup__input_value_job");
export const configValidation = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_disabled",
  inputErrorClass: "popup__input_type_error"
};
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const buttonConfirm = document.querySelector(".popup__btn_confirm");
export const buttonUpdateAvatar = document.querySelector(".popup__btn-update");
export const buttonAdd = document.querySelector(".popup__btn-add");
