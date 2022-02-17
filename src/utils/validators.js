const validateCharacterNum = (number) => {
    const data = {
        isValid: true,
        status: 200,
        message: "Success"
    }
    if (Number.isNaN(number)) {
        data.isValid = false;
        data.status = 400;
        data.message = "Character number should be a number"
    }
    if (number < 1 && number > 10) {
        data.isValid = false;
        data.status = 422;
        data.message = "Character number should be between 1-10"
    }
    return data;
}

module.exports = {
    validateCharacterNum
}