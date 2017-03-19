import ko = require("knockout");
import AppManager = require("../manager");
import SearchService = require("../../../services/searchService");
import {ISearchParams} from "../../../interfaces/ISearchParams";

"use strict";

class PagingViewModel {

    private pageLimit = 20;

    constructor() {

    }

    showPaging = ko.pureComputed<boolean>(() => {
        var isSearching = AppManager.isSearching();
        var results = AppManager.results();
        return !isSearching && !!results && results.total > 0;
    })

    itemsLabel = ko.pureComputed<string>(() => {
        var label: string = "";
        var isSearching = AppManager.isSearching();
        var results = AppManager.results();
        var page = AppManager.getPage();

        if (!isSearching && results) {
            var total = results.total;
            var fromNumber = ((page -1) * AppManager.limit()) + 1;
            var toNumber = page * AppManager.limit();
            toNumber = (toNumber < total)? toNumber : total;
            label = "items " + fromNumber + " to " + toNumber + " of " + total;
        }

        return label;
    });

    pageArray = ko.pureComputed<Array<number>>(() => {
        var pages: Array<number> = [];
        var isSearching = AppManager.isSearching();
        var results = AppManager.results();
        var page = AppManager.getPage();
        if (!isSearching && results) {
            var totalPages = Math.ceil(results.total / AppManager.limit());
            var lowerPage = (Math.floor(page / this.pageLimit)) * this.pageLimit + 1;
            var upperPage = (Math.ceil(page / this.pageLimit)) * this.pageLimit;
            console.log(lowerPage + " - " + upperPage);
            lowerPage = (upperPage < lowerPage)? lowerPage - this.pageLimit : lowerPage;
            upperPage = (upperPage < totalPages)? upperPage : totalPages;
            for (var i = lowerPage; i <= upperPage; i++) {
                pages.push(i);
            }
        }
        return pages;
    });

    isFirstPage = ko.pureComputed<boolean>(() => {
        var firstPage:boolean = false;
        var isSearching = AppManager.isSearching();
        var results = AppManager.results();
        if (!isSearching && results) {
            firstPage = AppManager.getPage() === 1;
        }
        return firstPage;
    });

    isLastPage = ko.pureComputed<boolean>(() => {
        var lastPage: boolean = false;
        var isSearching = AppManager.isSearching();
        var results = AppManager.results();
        var page = AppManager.getPage();
        if (!isSearching && results) {
            var totalPages = Math.ceil(results.total / AppManager.limit());
            lastPage = AppManager.getPage() === totalPages;
        }
        return lastPage;
    });

    isCurrentPage(page:number): boolean {
        return page === AppManager.getPage();
    }

    pageSelected = (page:number) => {
        var params:ISearchParams = AppManager.searchParams();
        params.page = page;
        AppManager.doSearch(params);
    }

    firstPage = () => {
        var params:ISearchParams = AppManager.searchParams();
        params.page = 1;
        AppManager.doSearch(params);
    }

    previousPage = () => {
        var page = AppManager.getPage();
        page = (page > 1)? page - 1 : page;
        var params:ISearchParams = AppManager.searchParams();
        params.page = page;
        AppManager.doSearch(params);
    }

    nextPage = () => {
        if (!AppManager.isSearching() && AppManager.results()) {
            var totalPages = Math.ceil(AppManager.results().total / AppManager.limit());
            var page = AppManager.getPage();
            page++;
            page = (page < totalPages)? page : totalPages;
            var params:ISearchParams = AppManager.searchParams();
            AppManager.doSearch(params);
        }
    }

    lastPage = () => {
        if (!AppManager.isSearching() && AppManager.results()) {
            var totalPages = Math.ceil(AppManager.results().total / AppManager.limit());
            var params:ISearchParams = AppManager.searchParams();
            params.page = totalPages;
            AppManager.doSearch(params);
        }
    }
}

export = PagingViewModel;