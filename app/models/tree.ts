import RecipeManager = require("../components/recipe/manager");
import TreeNode = require("./treenode");

"use strict";

class Tree {
    root: TreeNode;

    constructor() {
        if (RecipeManager.getRoot()) {
            this.root = new TreeNode(RecipeManager.getRoot());
            this.root.setChildren();
        }
    }

    public getTreeData():any {
        return this.root.getDetails();
    }

    public getBaseMaterials(): {[key: string]: {id: number, count: number}} {
        var items: {[key: string]: {id: number, count: number}} = {};
        this.root.getBaseMaterials(items);
        return items;
    }

    public getDepth():number {
        return this.root.getDepth();
    }
}

export = Tree;