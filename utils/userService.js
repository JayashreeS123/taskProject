
const connectToDatabase = require('./db');
const userSchema = require('../model/userSchema');

module.exports = class UserService{

    createUserDetails(payload){
        return new Promise((resolve, reject) => {
            connectToDatabase()
                .then(() => {
                    userSchema.create(payload)
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                });
        })
    }

    getUserDetails(queryObj, payload, option){
        return new Promise((resolve, reject) => {
            connectToDatabase().then(()=> {
                userSchema.find(queryObj,option)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err))
            })
        });
    }

    updateUserDetails(filter, data){
        const payload = {
            userRole : data.userRole
        };
        return new Promise((resolve, reject) => {
            connectToDatabase().then(()=> {
                userSchema.findOneAndUpdate(filter,data , {new : true})
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })

            })
        });

    }

    deleteUserDetails(id) {
        return new Promise((resolve, reject) => {
            connectToDatabase().then(()=> {
                userSchema.findByIdAndRemove(id)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err))
            })
        });
    }
}
