import React from 'react';
import Header from './Header';

export default function Login({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();

    onSubmit(email, password);
  }

  return (
    <>
      <Header link='/sign-up' text='Зарегистрироваться' />
      <section className='login'>
        <h2 className='login__title'>Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            className='login__input'
            value={email}
            onChange={handleChangeEmail}
            placeholder='Email'
          ></input>
          <input
            type='password'
            className='login__input'
            value={password}
            onChange={handleChangePassword}
            placeholder='Пароль'
          ></input>
          <button className='login__submit' type='submit'>
            Войти
          </button>
        </form>
      </section>
    </>
  );
}
