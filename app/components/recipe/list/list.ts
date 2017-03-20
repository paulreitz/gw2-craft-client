import ko = require("knockout");
import AppManager = require("../../app/manager");
import RecipeManager = require("../manager");

"use strict";

class ListViewModel {

    itemList = ko.observableArray<{name: string, icon: string, count: number}>([]);

    constructor () {
        this.buildList();
    }

    private buildList() {
        var itemsArray:Array<{name: string, icon: string, count: number}> = [];
        var items = AppManager.tree().getBaseMaterials();
        for (var key in items) {
            var item = RecipeManager.getItem(items[key].id);
            var itemEntry = {name: item.name, icon: item.icon, count: items[key].count};
            itemsArray.push(itemEntry);
        }
        this.itemList(itemsArray);
    }
}

export = ListViewModel;