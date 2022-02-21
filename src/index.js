const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const swapi = require('./api/swapi');
const { client, connect: connectRedis } = require('./database/redis');
const { validateCharacterNumber } = require('./middlewares/validate-path')

const app = express();
const port = 3001;

app.use(cors({
    origin: "*"
}));

app.get("/api/character/:number",validateCharacterNumber);
app.get("/api/character/:number", async (req, res) => {
    const { number } = req.params;

    try {
        let formattedPersona = {}

        if (await client.exists(number)) {
            formattedPersona = JSON.parse(await client.get(number));
            res.status(200).send(formattedPersona);
            return;
        }

        const people = await swapi.getPeopleByNumber(number);

        const homeworld = (await axios.get(people.homeworld)).data;
        formattedPersona = {
            name: people.name,
            birth_year: people.birth_year,
            homeworld: homeworld.name
        };

        await client.set(number, JSON.stringify(formattedPersona));
        client.expire(number, 10000);
        res.status(200).send(formattedPersona);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Swapi server port${port}`)
    });
});