'use strict';

const HttpHandler = require('../../util/httpService');
const userService  = require('../../utils/userService');
const UserService = new userService();
const HttpResponse = new HttpHandler();
const userSchema = require('../../model/userSchema');

module.exports.createUser =  ( async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let data = JSON.parse(event.body);
  
    try{
        let payload = {
        email : data.email,
        username : data.username,
        authenticationToken : data.authenticationToken,
        phoneNumber : data.phoneNumber,
        createdOn : new Date(),
        updatedOn : new Date()
    };
        let userDetails = await UserService.createUserDetails(payload);
        return HttpResponse.set(200,{
            userDetails: userDetails
        });
    }catch (e) {
        return HttpResponse.set(400,e.message);
    }
});

module.exports.getUser= (async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let queryObj = {};

    if(!!event.queryStringParameters){
        if(!!event.queryStringParameters.username || !!event.queryStringParameters.email){
            if(!!event.queryStringParameters.username){
                queryObj.username = event.queryStringParameters.username;
            }
            else if(!!event.queryStringParameters.email){
                queryObj.email = event.queryStringParameters.email;
            }
        }
    }else{
        return HttpResponse.set(400, 'Bad request. Accepted parameters',event);
    }
    try{
        let option = {new: true};
        let userDetails = await UserService.getUserDetails(queryObj, option);
        return HttpResponse.set(200, userDetails);

    } catch (e) {
        return HttpResponse.set(400, e.message);
    }
});

module.exports.updateUserAttributes = (async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let filter, payload = JSON.parse(event.body);
    filter = event.pathParameters.id;
    if(!filter) {
        return HttpResponse.set(400, "Missing mandatory path parameter - id");
    }
    try{
        let userDetails = await UserService.updateUserDetails(filter, payload);
        return HttpResponse.set(200, userDetails);

    } catch (e) {
        return HttpResponse.set(400, e.message);
    }
});

module.exports.deleteUserAttributes = (async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        let userDetails = await UserService.deleteUserDetails(event.pathParameters.id);
        return HttpResponse.set(200, `Removed with id ${userDetails._id}`);

    } catch (e) {
        return HttpResponse.set(400, e.message);
    }
});

