import ko = require("knockout");
import AboutManager = require("../manager");

"use strict";

class ScopeViewModel {

    onClose = () => {
        AboutManager.showWindow(false);
    }
}

export = ScopeViewModel;