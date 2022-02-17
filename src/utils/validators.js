const validateCharacterNum = (number) => {
    let data = {
        isValid: true,
        status: 200,
        message: "Success"
    }
    if (isNaN(number)) {
        data = {
            isValid: false,
            status: 400,
            message: "Character number should be a number"
        }
        return data;
    }
    if (number < 1 || number > 10) {
        data = {
            isValid: false,
            status: 422,
            message: "Character number should be between 1-10"
        }
        return data;
    }
    return data;
}

module.exports = {
    validateCharacterNum
}