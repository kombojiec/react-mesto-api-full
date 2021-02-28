const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const registration = require('./middlewares/validation/registration');
const authorization = require('./middlewares/validation/authorization');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errors = require('./errors/errors');

const { PORT = 3000 } = process.env;


const allowedCors = [
  'https://kombojiec.students.nomoreparties.space',
  'https://www.kombojiec.students.nomoreparties.space',
  'http://kombojiec.students.nomoreparties.space',
  'http://kombojiec.students.nomoreparties.space',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
};


const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);// Логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', registration, createUser);
app.post('/signin', authorization, login);
app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (req, res) => new errors.NotFound(`Page with path ${req.originalUrl} not found`));

app.use(errorLogger);// Логгер ошибок

app.use(errorHandler); // Обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`server listening port ${PORT}`);
});
