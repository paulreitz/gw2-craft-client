import ko = require("knockout");
import d3 = require("d3");
import AppManager = require("../../app/manager");
import RecipeManager = require("../manager");

"use strict";

class TreeViewModel {

    constructor() {
        this.buildTree();
    }

    buildTree() {
        var tree = AppManager.tree();
        if (tree) {
            var items = tree.getBaseMaterials();
            var width: number = 0;
            for (var i in items) {
                width += items[i].count;
            }
            width = width || 1;
            width *= 80;
            var height = tree.getDepth() * 80;

            var data = tree.getTreeData();

            var treemap = d3.tree().size([width, height]);
            var nodes = d3.hierarchy(data, (d) => {
                return d.children;
            });
            nodes = treemap(nodes);

            var svg = d3.select("#tree-container").append("svg")
                .attr("width", width + 50)
                .attr("height", height + 50);

            var g = svg.append("g");

            var link = g.selectAll(".link")
                .data(nodes.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .style("stroke", (d) => { return d.data.level; })
                .attr("d", (d:any) => {
                    return "M" + d.x + "," + d.y
                    + "C" + (d.x + d.parent.x) / 2 + "," + d.y
                    + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
                    + " " + d.parent.x + "," + d.parent.y;
                });

            var node = g.selectAll(".node")
                .data(nodes.descendants())
                .enter().append("g")
                .attr("class", (d) => {
                    return "node" + (d.children? " node-internal" : " node-leaf");
                })
                .attr("transform", (d:any) => {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            node.append("svg:image")
                .attr("x", -16)
                .attr("y", 0)
                .attr("width", 32)
                .attr("height", 32)
                .attr("xlink:href", (d:any) => { return d.data.icon; });
        }
    }
}

export = TreeViewModel;