import ko = require("knockout");
import AppManager = require("./manager");

"use strict";

class MainAppViewModel {
    theme = AppManager.theme;

    constructor() {
        
    }
}

export = MainAppViewModel;