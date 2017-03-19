import ko = require("knockout");

import {IItem} from "../../../interfaces/ISearchResults";

"use strict";

class TileViewModel {
    icon = ko.observable<string>("");
    name = ko.observable<string>("");
    rarity = ko.observable<string>("");
    level = ko.observable<string>();

    constructor(item:IItem) {
        this.icon(item.icon);
        this.name(item.name.replace("&lsquo;", "'"));
        this.rarity(item.rarity);
        this.level("Level: " + item.level.toString(10));
    }
}

export = TileViewModel;