import $ = require("jquery");
import BaseService = require("./baseService");
import {IItem, IItemSearchResults} from "../interfaces/ISearchResults";
import {ISearchParams} from "../interfaces/ISearchParams";

"use strict";

class SearchService extends BaseService {
    private static endpoint: string = "items";

    public static itemSearch(params:ISearchParams):JQueryPromise<IItemSearchResults> {
        var paramList:Array<string> = [];
        var deferred = $.Deferred();
        if (!isNaN(params.type)) {
            paramList.push("type=" + params.type.toString(10));
        }
        if (!isNaN(params.subType)) {
            paramList.push("subType=" + params.subType.toString(10));
        }
        if (!isNaN(params.rarity)) {
            paramList.push("rarity=" + params.rarity.toString(10));
        }
        if (!isNaN(params.min_level)) {
            paramList.push("min_level=" + params.min_level.toString(10));
        }

        var uri = this.endpoint;
        if (paramList.length) {
            uri += "?" + paramList.join("&");
        }

        this.ajax<IItemSearchResults>(uri, "GET").done((data:IItemSearchResults) => {
            deferred.resolve(data);
        })
        .fail(() => {
            deferred.fail();
        })

        return deferred.promise();
    }
}

export = SearchService;