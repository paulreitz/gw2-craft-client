import ko = require("knockout");
import RecipeManager = require("../manager");
import AppManager = require("../../app/manager");
import Tree = require("../../../models/tree");

"use strict";

class MainViewModel {

    isSearching = RecipeManager.isSearching;

    constructor() {
        this.isSearching(true);
        var id = AppManager.recipeId();
        RecipeManager.doSearch(id)
            .done((item) => {
                var t = new Tree();
                AppManager.tree(t);
                this.isSearching(false);
            })
            .fail((error) => {
                console.log(error);
            })
    }


    onClose = () => {
        RecipeManager.showWindow(false);
    }
}

export = MainViewModel;