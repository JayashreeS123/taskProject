class HTTPService{
    constructor(){
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
    }
    set(httpStatusCode, responseBody, headers = {}){
        return {
            statusCode: httpStatusCode || 404,
            headers: Object.assign(this.defaultHeaders, headers),
            body: JSON.stringify({
                success : (Number(httpStatusCode) - Number(httpStatusCode)%100) / 100 === 2,
                message : responseBody
            })
        }
    }
}

module.exports = HTTPService;
