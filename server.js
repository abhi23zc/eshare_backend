const express = require('express');
const app = express();
const db = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors())

app.use('/uploads', express.static(__dirname + '/uploads'))

const PORT = 80 || process.env.PORT;

db();
app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
// for parsing application/xwww-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    })
);


app.use('/files', require('./routes/show'))
app.use('/api/files', require('./routes/files'))
app.listen(PORT, () => {
    console.log("Listening on port" + PORT)
})