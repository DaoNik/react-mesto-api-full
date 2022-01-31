import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Register({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();

    onSubmit(email, password);
  }

  return (
    <>
      <Header link="/react-mesto-auth/sign-in" text="Войти" />
      <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <form onSubmit={handleRegister}>
          <input
            className="login__input"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
          ></input>
          <input
            type="password"
            className="login__input"
            value={password}
            onChange={handleChangePassword}
            placeholder="Пароль"
          ></input>
          <button className="login__submit" type="submit">
            Зарегистрироваться
          </button>
          <Link to="/react-mesto-auth/sign-in" className="login__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>
    </>
  );
}
