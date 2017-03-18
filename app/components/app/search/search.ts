import ko = require("knockout");
import SubTypes = require("./subtypes");
import AppManager = require("../manager");

import {ISearchParams} from "../../../interfaces/ISearchParams";

"use strict";

class SearchPanelViewModel {
    types = ko.observableArray<{type: string, value: number}>([]);
    rarities = ko.observableArray<{rarity: string, value: number}>([]);
    levels = ko.observableArray<number>([]);

    type = ko.observable<{type: string, value: number}>();
    subType = ko.observable<{type: string, value: number}>();
    rarity = ko.observable<{rarity: string, value: number}>();
    level = ko.observable<number>();

    filterLabel = ko.observable<string>("Filters");
    typeLabel = ko.observable<string>("Type");
    subTypeLabel = ko.observable<string>("Subtype");
    rarityLabel = ko.observable<string>("Rarity");
    levelLabel = ko.observable<string>("Minimum Level");
    searchText = ko.observable<string>("Search");

    constructor() {
        var baseTypes: Array<string> = ["Armor","Back","Bag","Consumable","Container","CraftingMaterial","Gathering","Gizmo","Trinket","Trophy","UpgradeComponent","Weapon"];
        var baseRarities: Array<string> = ["Junk","Basic","Fine","Masterwork","Rare","Exotic","Ascended","Legendary"];

        var typesArray:Array<{type: string, value: number}> = [];
        baseTypes.forEach((type:string, index:number) => {
            typesArray.push({type: type, value: index});
        });
        typesArray.unshift({type: "All", value: -1});
        this.types(typesArray);

        var raritiesArray:Array<{rarity: string, value: number}> = [];
        baseRarities.forEach((rarity: string, index: number) => {
            raritiesArray.push({rarity: rarity, value: index});
        });
        raritiesArray.unshift({rarity: "All", value: -1});
        this.rarities(raritiesArray);

        var levelsArray: Array<number> = [];
        for (var i = 1; i <= 80; i++) {
            levelsArray.push(i);
        }
        this.levels(levelsArray);
    }

    subTypes = ko.pureComputed<Array<{type:string, value: number}>>(() => {
        var subtypes:Array<{type:string, value: number}> = [];
        if (this.type()) {
            subtypes = SubTypes.subTypes[this.type().type] || [];
        }
        subtypes.unshift({type: "All", value: -1});
        return subtypes;
    });

    onSearch = (e) => {
        var params:ISearchParams = {};
        if (this.type().value > -1) {
            params.type = this.type().value;
        }
        if (this.subType().value > -1) {
            params.subType = this.subType().value;
        }
        if (this.rarity().value > -1) {
            params.rarity = this.rarity().value;
        }
        params.min_level = this.level();
        params.page = 1;
        params.limit = 10;
        AppManager.doSearch(params).done((result) => {
            console.log(result);
        })
        .fail((err) => {
            console.log(err);
        })
    }
}

export = SearchPanelViewModel;