const axios = require('axios').default;

axios.defaults.baseURL = "https://swapi.dev/api";

const getPeopleByNumber = async (number) => {
    const result = await axios.get(`/people/${number}`);
    return result.data;
}

module.exports.getPeopleByNumber = getPeopleByNumber;