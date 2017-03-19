import {IItem} from "./ISearchResults";

export interface IIngredient {
    item_id: number;
    count: number;
}

export interface INode {
    id: number;
    children?: Array<IIngredient>;
}

export interface IRecipeTree {
    root: number;
    nodes: {[key: string]: INode};
    items: {[key: string]: IItem};
}