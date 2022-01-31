import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import api from '../utils/api';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import avatar from '../images/Avatar.png';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import RequireAuth from './RequireAuth';

function App() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState(
    localStorage.getItem('email') ? localStorage.getItem('email') : ''
  );
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar,
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .addCards()
      .then((newCards) => {
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleCardLike(card, isLiked) {
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function handleUpdateUser({ name, about }) {
    api
      .addNewUserInfo(name, about)
      .then(() => {
        setCurrentUser({ ...currentUser, name: name, about: about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlace(name, link) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({
      isOpen: false,
      name: '',
      link: '',
    });
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('email', email);
        navigate('/');
      })
      .catch((err) => {
        if (err === '400') {
          console.log('не передано одно из полей');
        } else if (err === '401') {
          console.log('пользователь с email не найден');
        } else {
          console.log(`Ошибка: ${err}`);
        }
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setLoggedIn(true);
        handleCheckRegister(true);
        setUserEmail(email);
        localStorage.setItem('email', email);
      })
      .catch((err) => {
        handleCheckRegister(false);
        if (err === '400') {
          console.log('некорректно заполнено одно из полей');
        } else {
          console.log(`Ошибка: ${err}`);
        }
      });
  }

  function handleCheckRegister(isRegister) {
    setIsInfoTooltipOpen(true);
    if (isRegister) {
      navigate('/');
    }
  }

  const location = useLocation();

  React.useEffect(() => {
    handleTokenCheck(location.pathname);
  }, []);

  function handleTokenCheck(path) {
    if (localStorage.getItem('token')) {
      auth
        .checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(path);
          }
        })
        .catch((err) => {
          if (err === '400') {
            console.log('Токен не передан или передан не в том формате');
          } else if (err === '401') {
            console.log('Переданный токен некорректен');
          } else {
            console.log(`Ошибка: ${err}`);
          }
        });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <RequireAuth
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
              onLogout={handleLogout}
              userEmail={userEmail}
            />
          }
        />
        <Route
          path='/sign-up'
          element={<Register onSubmit={handleRegister} />}
        />
        <Route path='/sign-in' element={<Login onSubmit={handleLogin} />} />
        <Route
          path='*'
          element={
            <RequireAuth
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
              onLogout={handleLogout}
              userEmail={userEmail}
            />
          }
        />
      </Routes>

      <Footer />

      <InfoTooltip
        isRegister={loggedIn}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
