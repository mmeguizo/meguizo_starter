
require('dotenv').config()
const crypto = require('crypto');


const hash = crypto.createHmac('sha256', 'MEGUIZO').update('meguizo_starter').digest('hex');

module.exports = {
    //uri: 'mongodb://localhost:27017/' + this.db,
    uri: process.env.DB_HOST,
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    // db: 'meguizo_starter'
    // db: process.env.DB_HOST,
    database_name: process.env.DB_NAME,
}