import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        link="/react-mesto-auth/sign-in"
        userEmail={props.userEmail}
        onLogout={props.onLogout}
        text="Выйти"
      />
      <main>
        <section className="profile">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__button-edit"
              aria-label="Кнопка для открытия окна редактирования имени пользователя и рода деятельности"
            ></button>
          </div>
          <div
            className="profile__container-avatar"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар профиля"
            />
          </div>
          <button
            type="button"
            onClick={props.onAddPlace}
            className="profile__button-add"
            aria-label="Кнопка для открытия окна добавления мест"
          ></button>
        </section>

        <section className="gallery">
          <ul className="gallery__cards">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
