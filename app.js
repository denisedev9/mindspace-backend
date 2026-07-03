require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const { MONGO_URI = 'mongodb://localhost:27017/mindspacedb', PORT = 3000 } = process.env;

const app = express();

mongoose.connect(MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use(router);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso no encontrado' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
