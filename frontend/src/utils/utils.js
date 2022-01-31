export function renderCreating(isCreating, button) {
  if (isCreating) {
    button.textContent = "Создание...";
  } else {
    button.textContent = "Создать";
  }
}

export function renderDeleting(isDeleting, button) {
  if (isDeleting) {
    button.textContent = "Удаление...";
  } else {
    button.textContent = "Да";
  }
}

export function renderSaving(isSaving, button) {
  if (isSaving) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
