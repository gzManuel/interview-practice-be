const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
    origin: "*"
}))

app.get("/api/character/:number", (req, res) => {

})


app.listen(port, () => {
    console.log(`Swapi server port${port}`)
});