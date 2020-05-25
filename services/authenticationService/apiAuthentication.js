'use strict';

const httpService = require('../../utils/httpService');
const HTTPService = new httpService();
const userService  = require('../../utils/userService');
const UserService = new userService();

module.exports.registerUser =(async (event)=> {
    let data = JSON.parse(event.body);
    if(!data.username || !data.email || !data.phoneNumber){
        return HTTPService.set(400, "MISSING MANDATORY_PARAMETERS");
    }
    try{
            let payload = {
                email: data.email,
                username: data.name,
                phoneNumber: cognitoUser.user.username,
                createdOn: new Date()
            };
            await UserService.createUserDetails(payload);
        
        return HTTPService.set(200, cognitoUser);
    } catch (e) {
        return HTTPService.set(400, e.message);
    }
});
/**
 *
 * @param event
 * @returns {Promise<{statusCode, headers, body}>}
 */
module.exports.login = ( async(event)=> {
    let data = JSON.parse(event.body);
    let user = {};
    try {

        user = await AuthenticationService.doLogin(data);
        let id = {};
        let option = {new: true};
        if(user.idToken.payload.sub){
            id.userSub =  user.idToken.payload.sub;
            let credentials = await UserService.getUserDetails(id, option);
            user.credentials = credentials[0];
        }
        return HTTPService.set(200, user);

    } catch (e) {
        return HTTPService.set(400, e.message);
    }
});

