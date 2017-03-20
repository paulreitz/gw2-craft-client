import ko = require("knockout");
import AppManager = require("../manager");
import RecipeManager = require("../../recipe/manager");

import {IItem} from "../../../interfaces/ISearchResults";

"use strict";

class TileViewModel {
    icon = ko.observable<string>("");
    name = ko.observable<string>("");
    rarity = ko.observable<string>("");
    level = ko.observable<string>();
    item_id:number;

    constructor(item:IItem) {
        this.icon(item.icon);
        this.name(item.name.replace("&lsquo;", "'"));
        this.rarity(item.rarity);
        this.level("Level: " + item.level.toString(10));
        this.item_id = item.id;
    }

    onSelect = () => {
        AppManager.recipeId(this.item_id);
        RecipeManager.showWindow(true);
    }
}

export = TileViewModel;