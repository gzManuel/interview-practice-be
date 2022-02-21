const Joi = require('joi');

const validateCharacterNumber = (req, res, next) => {
    const { number } = req.params;
    try {
        Joi.assert(number, Joi.number().greater(0).less(11));
    } catch (error) {
        res.status(400).send({ message: error.details[0].message });
        return
    }
    next();
};

module.exports = {
    validateCharacterNumber
}