const express = require('express');
const cors = require('cors');

const swapi = require('./api/swapi');
const { default: axios } = require('axios');
const { client, connect } = require('./database/redis');

const app = express();
const port = 3001;

connect();
app.use(cors({
    origin: "*"
}));

app.get("/api/character/:number", async (req, res) => {
    const number = req.params.number;
    try {
        
        if (await client.exists(number)) {
            const formattedPersona = JSON.parse(await client.get(number));
            res.status(200).send(formattedPersona);
        } else {
            const people = await swapi.getPeopleByNumber(number);
            const homeworld = (await axios.get(people.homeworld)).data;

            const formattedPersona = {
                name: people.name,
                birth_year: people.birth_year,
                homeworld: homeworld.name
            };
            client.set(number, JSON.stringify(formattedPersona));
            res.status(200).send(formattedPersona);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Swapi server port${port}`)
});