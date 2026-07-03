const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMood, getMoods } = require('../controllers/moods');

router.get('/', getMoods);

router.post('/', celebrate({
  body: Joi.object().keys({
    mood: Joi.string().valid('happy', 'neutral', 'sad').required(),
    note: Joi.string().allow('').default(''),
  }),
}), createMood);

module.exports = router;
