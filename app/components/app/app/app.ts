import ko = require("knockout");
import RecipeManager = require("../../recipe/manager");

"use strict";

class AppViewModel {
    title = ko.observable<string>("Craft Stuff");
    showRecipe = RecipeManager.showWindow;

}

export = AppViewModel;