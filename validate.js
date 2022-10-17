const Joi = require('joi');

//Validating the registration inputs
const registrationValidation = Joi.object({
    name : Joi.string().min(7).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
})

//Validating the login inputs
const loginValidation =  Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
})

//Validating the post inputs
const postValidation = Joi.object({
    title : Joi.string().max(100).required(),
    description : Joi.string().required()
})

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation