({
    baseUrl: "./app",
    name: "core/startup",
    paths: {
        requireLib: "../bower_components/requirejs/require",
        knockout: "../bower_components/knockout/dist/knockout",
        d3: "../bower_components/d3/d3.min",
        text: "../bower_components/text/text"
    },
    include: [
        "requireLib",
        "knockout",
        "d3",
        "text",
        "text!components/about/main/main.html",
        "components/about/main/main",
        "text!components/app/app/app.html",
        "components/app/app/app",
        "text!components/app/paging/paging.html",
        "components/app/paging/paging",
        "text!components/app/results/results.html",
        "components/app/results/results",
        "text!components/app/search/search.html",
        "components/app/search/search",
        "text!components/app/tile/tile.html",
        "components/app/tile/tile",
        "text!components/recipe/list/list.html",
        "components/recipe/list/list",
        "text!components/recipe/main/main.html",
        "components/recipe/main/main",
        "text!components/recipe/tree/tree.html",
        "components/recipe/tree/tree"
    ],
    insertRequire: ["core/startup"],
    mainConfigFile: "app/core/require.config.js",
    optimize: "uglify",
    optimizeCss: "none",
    out: "./dist/scripts/app.min.js"
})