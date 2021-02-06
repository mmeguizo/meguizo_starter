
require('dotenv').config()
const crypto = require('crypto');


const hash = crypto.createHmac('sha256', 'MEGUIZO').update('meguizo_starter').digest('hex');

module.exports = {
    //uri: 'mongodb://localhost:27017/' + this.db,
    uri: process.env.DB_HOST || 'meguizo:PowerTripper00@cluster0-shard-00-00.zwkop.mongodb.net:27017,cluster0-shard-00-01.zwkop.mongodb.net:27017,cluster0-shard-00-02.zwkop.mongodb.net:27017/meguizo?ssl=true&replicaSet=atlas-11cb0q-shard-0&authSource=admin&retryWrites=true&w=majority',
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    // db: 'meguizo_starter'
    // db: process.env.DB_HOST,
    database_name: process.env.DB_NAME,
}