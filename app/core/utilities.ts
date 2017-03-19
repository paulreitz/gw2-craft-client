"use strict";

class Utilities {
    public static getNextId():string {
        return (parseInt(Math.random() * Math.pow(2, 34) + "" + 10)).toString(36).toUpperCase();
    }
}

export = Utilities;