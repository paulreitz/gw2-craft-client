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
        "text!components/app/app/app.html",
        "components/app/app/app",
        "text!components/app/results/results.html",
        "components/app/results/results",
        "text!components/app/search/search.html",
        "components/app/search/search",
        "text!components/app/tile/tile.html",
        "components/app/tile/tile"
    ],
    insertRequire: ["core/startup"],
    mainConfigFile: "app/core/require.config.js",
    optimize: "uglify",
    optimizeCss: "none",
    out: "./dist/scripts/app.min.js"
})