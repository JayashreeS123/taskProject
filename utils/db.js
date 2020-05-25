const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
let isConnected;
let DB = 'mongodb://localhost:27017/userLogin';
module.exports = connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return Mongoose.connect(DB,{
        useNewUrlParser: true ,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(db => {
        isConnected = db.connections[0].readyState;
    });


};
