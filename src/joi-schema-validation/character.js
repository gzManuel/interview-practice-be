const Joi = require('joi');

const schemaCharacter = Joi.object({
    name: Joi.string(),
    birth_year: Joi.string(),
    homeworld: Joi.string()
});

module.exports = schemaCharacter;