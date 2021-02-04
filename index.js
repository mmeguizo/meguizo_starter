require('dotenv').config()
const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const PORT = 3000;
const path = require('path');
const authentication = require('./routes/authentication')(router);

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.uri, config.options, (err) => {
    if (err) {
        console.log('cant connect to database ' + process.env.DB_NAME);
    } else {
        console.log('connected to the database ' + process.env.DB_NAME);
    }
});

//body-parser built in express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//for development mode
app.use(express.static(__dirname + '/app/dist/app'));

app.use('/authentication', authentication);


app.get('*', (req, res) => {
    //  res.send('<h1>Hello from the Server Side</h1>')
    res.sendFile(path.join(__dirname + '/app/dist/app/index.html'),)
});


app.listen(PORT, () => {
    console.log('Spying on port ' + PORT);
});