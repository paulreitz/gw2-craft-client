import RecipeManager = require("../components/recipe/manager");
import Utilities = require("../core/utilities");

import {INode} from "../interfaces/IRecipe";
import {IItem} from "../interfaces/ISearchResults";

"use strict";

class TreeNode {
    item_id: number;
    children: Array<TreeNode>;
    id: string;

    constructor(id: number) {
        this.item_id = id;
        this.id = Utilities.getNextId();
    }

    public setChildren():void {
        this.children = [];
        var node:INode = RecipeManager.getNode(this.item_id);
        if (node.children) {
            node.children.forEach((child) => {
                for (var i = 0; i < child.count; i++) {
                    var childNode:TreeNode = new TreeNode(child.item_id);
                    childNode.setChildren();
                    this.children.push(childNode);
                }
            });
        }
    }

    public getDetails(parent?: string):any {
        var item:IItem = RecipeManager.getItem(this.item_id);
        var data:{id: string, item: number, name: string, icon: string, parent?: string, children?: Array<any>} = {
            id: this.id,
            item: this.item_id,
            name: item.name,
            icon: item.icon
        };
        if (parent) {
            data.parent = parent;
        }
        if (this.children && this.children.length) {
            data.children = [];
            this.children.forEach((child) => {
                data.children.push(child.getDetails(this.id));
            });
        }
        return data;
    }

    public getBaseMaterials(items: {[key: string]: {id: number, count: number}}): {[key: string]: {id: number, count: number}} {
        if (this.children && this.children.length) {
            this.children.forEach((child) => {
                child.getBaseMaterials(items);
            });
        }
        else {
            if (items["item_" + this.item_id.toString(10)]) {
                var count = items["item_" + this.item_id.toString(10)].count;
                count++;
                items["item_" + this.item_id.toString(10)].count = count;
            }
            else {
                items["item_" + this.item_id.toString(10)] = {id: this.item_id, count: 1};
            }
        }
        return items;
    }

    public getDepth(count:number = 0):number {
        count++;
        if (this.children && this.children.length) {
            var innerCount:number = 0;
            var i = 0;
            this.children.forEach((child) => {
                var i = child.getDepth(count);
                if (i > innerCount) {
                    innerCount = i;
                }
            });
            count += innerCount;
        }
        return count;
    }

    public dispose():void {
        if (this.children && this.children.length) {
            this.children.forEach((child) => {
                child.dispose();
                child = null;
            });
        }
        this.children = [];
    }
}

export = TreeNode;