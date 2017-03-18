import $ = require("jquery");
import Config = require("../core/config");

"use strict";

class BaseService {
    protected static baseUrl:string = Config.SERVER_URI;

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