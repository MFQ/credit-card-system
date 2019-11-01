var Joi = require('joi');
var schemas = require('../schemas');
var supportedMethods = ['post', 'put'];
var _ = require('lodash');

module.exports = (req, res, next) => {
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true, 
    stripUnknown: true,
  };
  var route = req.originalUrl;
  var method = req.method.toLowerCase();
  if (_.includes(supportedMethods, method) && _.has(schemas, route) ) {
    var _schema = _.get(schemas, route);
    return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
      if (err) {
        const JoiError = {
          status: 'failed',
          error: {
            original: err._object,
            details: _.map(err.details, ({message, type}) => ({
              message: message.replace(/['"]/g, ''),
              type
            }))
          }
        };
        res.status(422).json(JoiError);
      } else {
        req.body = data;
        next();
      }
    });
  }
  next();
}