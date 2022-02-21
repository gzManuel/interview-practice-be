const { connect: connectRedis } = require('./database/redis');
const app = require('./app');

const port = 3001;

connectRedis().then(() => {
    app.listen(port, () => {
        console.log(`Swapi server port${port}`)
    });
});