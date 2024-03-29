require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const router = express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const path = require('path');

//there is order here if you put blogs above authentication it will not require a token
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);



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


//once live change it to the server side ip
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:4200'
// }))

//body-parser built in express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// will allow all link || not good
//app.use(cors())

//for development mode
app.use(express.static(__dirname + '/app/dist/app'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);


app.get('*', (req, res) => {
    //  res.send('<h1>Hello from the Server Side</h1>')
    res.sendFile(path.join(__dirname + '/app/dist/app/index.html'),)
});


app.listen(PORT, () => {
    console.log('Connected on port ' + PORT);
});

