import $ = require("jquery");

"use strict";

class BaseService {
    protected static baseUrl:string = "http://localhost:1337/api/";

    protected static ajax<T>(url: string, method: string): JQueryPromise<T> {
        var deferred = $.Deferred();

        var uri = this.baseUrl + url;

        $.ajax(uri, {method: method})
        .done((data:T) => {
            deferred.resolve(data);
        })
        .fail(() => {
            deferred.reject();
        })


        return deferred.promise();
    }
}

export = BaseService;