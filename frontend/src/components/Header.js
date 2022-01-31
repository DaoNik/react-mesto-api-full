import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ link, text, onLogout, userEmail }) {
  function handleLogout() {
    if (text === 'Выйти') {
      onLogout();
    }
  }

  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        <img src={logo} alt='Логотип Mesto-Russia' className='header__image' />
      </Link>
      <div className='header__auth-block'>
        <p className='header__email'>{userEmail}</p>
        <Link onClick={handleLogout} className='header__link-auth' to={link}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
