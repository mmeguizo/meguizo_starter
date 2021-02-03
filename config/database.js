
// module.exports = {


//     database: 'mongodb://localhost:27017/meguizo_starter',

//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }

// }\

//const crypto = require('crypto').crypto.randomBytes(256).toString('hex');

const crypto = require('crypto');
crypto.randomBytes(256, (err, buf) => {
    if (err) throw err;
    // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

module.exports = {
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: crypto,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    db: 'meguizo_starter'
}