const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const registration = require('./middlewares/validation/registration');
const authorization = require('./middlewares/validation/authorization');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);// Логгер запросов

app.post('/signup', registration, createUser);
app.post('/signin', authorization, login);
app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: `Page with path ${req.originalUrl} not found` });
});

app.use(errorLogger);// Логгер ошибок

app.use(errorHandler); // Обработчик ошибок

app.listen(PORT, () => {
  console.log(`server listening port ${PORT}`);
});
