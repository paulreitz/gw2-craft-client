import ko = require("knockout");
import RecipeService = require("../../services/recipeService");

import {IItem} from "../../interfaces/ISearchResults";
import {INode, IRecipeTree} from "../../interfaces/IRecipe";

"use strict";

class RecipeManager {
    private static treeData: IRecipeTree;
    public static showWindow = ko.observable<boolean>(false);
    public static isSearching = ko.observable<boolean>(false);

    public static doSearch(id:number):JQueryPromise<IRecipeTree> {
        var deferred = $.Deferred<IRecipeTree>();
        RecipeService.getRecipe(id)
            .done((recipe:IRecipeTree) => {
                this.treeData = recipe;
                deferred.resolve(recipe);
            })
            .fail((error) => {
                deferred.reject(error);
            })
        return deferred.promise();
    }

    public static getNode(id: Number): INode {
        var node:INode = null;
        if (this.treeData) {
            node = this.treeData.nodes["node_" + id.toString(10)];
        }
        return node;
    }

    public static getRoot():number {
        var root = 0;
        if (this.treeData) {
            root = this.treeData.root;
        }
        return root;
    }

    public static getItem(id: number): IItem {
        var item:IItem = null;
        if (this.treeData) {
            item = this.treeData.items["item_" + id];
        }
        return item;
    }
}

export = RecipeManager;