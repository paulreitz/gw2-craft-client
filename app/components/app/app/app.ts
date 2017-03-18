import ko = require("knockout");

"use strict";

class AppViewModel {
    title = ko.observable<string>("Craft Stuff");

}

export = AppViewModel;