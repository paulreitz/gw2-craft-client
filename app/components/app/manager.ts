import ko = require("knockout");

"use strict";

class AppManager {
    public static theme = ko.observable<string>("default");
}

export = AppManager;