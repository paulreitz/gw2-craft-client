import ko = require("knockout");

"use strict";

class AboutManager {
    public static showWindow = ko.observable<boolean>(true);
}

export = AboutManager;