
require('dotenv').config()
const crypto = require('crypto');
crypto.randomBytes(256, (err, buf) => {
    if (err) throw err;
    // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

module.exports = {
    //uri: 'mongodb://localhost:27017/' + this.db,
    uri: process.env.DB_HOST,
    secret: crypto,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    // db: 'meguizo_starter'
    // db: process.env.DB_HOST,
    database_name: process.env.DB_NAME,
}