import ko = require("knockout");
import MainAppViewModel = require("../components/app/main");


var gwLoader = {
    getConfig(name:string, callBack:(model:Object) => void) {
        if (name.indexOf("-") > 0) {
            var parts = name.split("-");
            var base = parts[0];
            var component = parts[1];
            callBack({
                template: { require: "text!components/" + base + "/" + component + "/" + component + ".html" },
                viewModel: { require: "components/" + base + "/" + component + "/" + component }
            });
        }
        else {
            callBack(null);
        }
    }
}

ko.components.loaders.unshift(gwLoader);
ko.applyBindings(new MainAppViewModel());

