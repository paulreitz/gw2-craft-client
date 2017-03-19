import ko = require("knockout");
import AppManager = require("../manager");

"use strict";

class ResultsViewModel {
    noResults = ko.observable<string>("No search results available");
    results = AppManager.results;
    isSearching = AppManager.isSearching;

    constructor() {
        
    }

}

export = ResultsViewModel;