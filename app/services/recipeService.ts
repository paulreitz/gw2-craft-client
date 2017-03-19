import $ = require("jquery");
import BaseService = require("./baseService");
import {IRecipeTree} from "../interfaces/IRecipe";

"use strict";

class RecipeService extends BaseService {
    private static endpoint: string = "recipe";

    public static getRecipe(id: number): JQueryPromise<IRecipeTree> {
        var deferred = $.Deferred<IRecipeTree>();
        var uri = this.endpoint + "/" + id.toString(10);
        this.ajax(uri, "GET")
            .done((recipe:IRecipeTree) => {
                deferred.resolve(recipe);
            })
            .fail((error) => {
                deferred.reject(error);
            })
        return deferred.promise();
    }

}

export = RecipeService;
