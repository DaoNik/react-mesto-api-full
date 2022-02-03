const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middleware/auth');
const NotFoundError = require('../errors/NotFoundError');

router.get('/', (req, res) => {
  res.send('hello');
});

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  // eslint-disable-next-line comma-dangle
  login
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(http|https):\/\/(www){0,1}\.?\w+\.\S+/),
    }),
  }),
  // eslint-disable-next-line comma-dangle
  createUser
);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use(/.*/, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
