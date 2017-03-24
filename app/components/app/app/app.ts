import ko = require("knockout");
import RecipeManager = require("../../recipe/manager");
import AboutManager = require("../../about/manager");

"use strict";

class AppViewModel {
    title = ko.observable<string>("GW2 Craft Utility");
    showRecipe = RecipeManager.showWindow;
    showAbout = AboutManager.showWindow;

    openAbout = () => {
        AboutManager.showWindow(true);
    }

}

export = AppViewModel;