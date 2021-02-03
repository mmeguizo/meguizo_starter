const express = require('express');
const app = express();
const config = require('./config/database');
const mongoose = require('mongoose');
const PORT = 3000;
const path = require('path');


mongoose.Promise = global.Promise;

mongoose.connect(config.uri, config.options, (err) => {
    if (err) {
        console.log('cant connect to database ' + config.db);
    } else {
        console.log('connected to the database ' + config.db);
    }
});

//for development mode
app.use(express.static(__dirname + '/app/dist/app'));

app.get('*', (req, res) => {
    //  res.send('<h1>Hello from the Server Side</h1>')
    res.sendFile(path.join(__dirname + '/app/dist/app/index.html'),)
});


app.listen(PORT, () => {
    console.log('Spying on port ' + PORT);
});