var Joi = require('joi');

var cardSchema = {
  name: Joi.string().required(),
  cardNumber: Joi.string().required(),
  limit: Joi.number().required(),
  balance: Joi.number().required(),
}

module.exports = cardSchema;