import ko = require("knockout");
import SubTypes = require("./subtypes");

"use strict";

class SearchPanelViewModel {
    types = ko.observableArray<{type: string, value: number}>([]);
    rarities = ko.observableArray<{rarity: string, value: number}>([]);
    levels = ko.observableArray<number>([]);

    type = ko.observable<{type: string, value: number}>();
    subType = ko.observable<{type: string, value: number}>();
    rarity = ko.observable<{rarity: string, value: number}>();
    level = ko.observable<number>();

    constructor() {
        var baseTypes: Array<string> = ["Armor","Back","Bag","Consumable","Container","CraftingMaterial","Gathering","Gizmo","Trinket","Trophy","UpgradeComponent","Weapon"];
        var baseRarities: Array<string> = ["Junk","Basic","Fine","Masterwork","Rare","Exotic","Ascended","Legendary"];

        var typesArray:Array<{type: string, value: number}> = [];
        baseTypes.forEach((type:string, index:number) => {
            typesArray.push({type: type, value: index});
        });
        this.types(typesArray);

        var raritiesArray:Array<{rarity: string, value: number}> = [];
        baseRarities.forEach((rarity: string, index: number) => {
            raritiesArray.push({rarity: rarity, value: index});
        });
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
}

export = SearchPanelViewModel;