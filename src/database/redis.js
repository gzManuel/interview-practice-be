const { createClient } = require('redis');

const client = createClient()

const connect = async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connect',()=>{
        console.log('connect redis success');
    })
    await client.connect();
}


module.exports = {
    connect,
    client
}