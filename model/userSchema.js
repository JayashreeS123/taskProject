const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    authenticationToken: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    createdOn:{
        type:Date,
        required: true
    },
    updatedOn:{
        type:Date
    }
});

let model;
try {
    model = Mongoose.model('userDetail');
} catch (error) {
    model = Mongoose.model('userDetail', userSchema);
}

module.exports = model;




