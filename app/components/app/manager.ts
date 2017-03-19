import ko = require("knockout");
import $ = require("jquery");
import SearchService = require("../../services/searchService");
import {ISearchParams} from "../../interfaces/ISearchParams";
import {IItemSearchResults} from "../../interfaces/ISearchResults";

"use strict";

class AppManager {
    public static theme = ko.observable<string>("default");

    private static searchParams:ISearchParams;

    public static results = ko.observable<IItemSearchResults>({total: 0, results: []});
    public static isSearching = ko.observable<boolean>(false);

    public static doSearch(params?:ISearchParams): JQueryPromise<IItemSearchResults> {
        this.isSearching(true);
        var deferred = $.Deferred<IItemSearchResults>();
        this.searchParams = params;
        SearchService.itemSearch(params)
            .done((results:IItemSearchResults) => {
                this.results(results);
                this.isSearching(false);
                deferred.resolve(results);
            })
            .fail((error) => {
                this.isSearching(false);
                deferred.fail(error);
            })
        return deferred.promise();
    }
}

export = AppManager;