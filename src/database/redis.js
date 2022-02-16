const { createClient } = require('redis');

const client = createClient()

const connect = async () => {
    console.log('Redis connection');
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect();
}

module.exports = {
    connect,
    client
}