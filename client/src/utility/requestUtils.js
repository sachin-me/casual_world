import fetch from 'isomorphic-fetch';

class Request {

    constructor() {
        this._doGetParam = this._doGetParam.bind(this);
        this._doPostParam = this._doPostParam.bind(this);

        this.firebaseHeaders = {
            'Content-Type': 'application/json',
            'Authorization': "key=AOzaSyAc54587dshfiuedP5uZLio"
        }
    }

     _doGetParam (headers) {
        var params = {
            method: 'GET',
            dataType: 'JSON',
            headers: headers
        };
        return params;
    }; 

    _doDeleteParam (headers, requestBody) {
        var params = {
            method: 'DELETE',
            dataType: 'JSON',
            headers: headers,
            body: JSON.stringify(requestBody)
        };
        return params;
    }; 

    _doPostParam (headers, requestBody) {
        var params = {
            method: 'POST',
            dataType: 'JSON',
            headers: headers,
            body: JSON.stringify(requestBody)
        };
        return params;
    }; 



    doGetFirebase (url) {
        var param = this._doGetParam(this.firebaseHeaders)
        return fetch(url, param)
    }

    doPostFirebase (url, body) {
        var params = this._doPostParam(this.firebaseHeaders, body);
        return fetch(url, params);
    }

}

var request = new Request();

export default request;