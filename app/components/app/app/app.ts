import ko = require("knockout");
import RecipeManager = require("../../recipe/manager");

"use strict";

class AppViewModel {
    title = ko.observable<string>("GW2 Craft Utility");
    showRecipe = RecipeManager.showWindow;

}

export = AppViewModel;