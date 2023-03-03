const Joi = require("joi");

const validateRegister = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  userName: Joi.string().min(3).max(13).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).required(),
});


module.exports = {
  validateRegister,
  validateLogin,
};
