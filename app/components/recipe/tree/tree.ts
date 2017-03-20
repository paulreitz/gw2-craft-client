import ko = require("knockout");
import d3 = require("d3");
import AppManager = require("../../app/manager");
import RecipeManager = require("../manager");

"use strict";

class TreeViewModel {

    lastScrollLeft:number;
    lastScrollTop:number;
    lastMouseX:number;
    lastMouseY:number;
    isMoving:boolean = false;

    constructor() {
        this.buildTree();
    }

    buildTree() {
        var tree = AppManager.tree();
        var topNode:number;
        var viewPort:number = $("#recipe-tree").width()/2;
        if (tree) {
            var items = tree.getBaseMaterials();
            var width: number = 0;
            for (var i in items) {
                width += items[i].count;
            }
            width = width || 1;
            width *= 80;
            var height = tree.getDepth() * 80;
            $("#tree-container").width(width);
            $("#tree-container").height(height);

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
                .attr("class", (d:any) => {
                    if (!d.parent) {
                        topNode = d.x;
                    }
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

            node.append("text")
                .attr("dy", ".35em")
                .attr("y", 38)
                .style("text-anchor", "middle")
                .attr("class", "dark-text")
                .text((d:any) => { return d.data.name.replace("&lsquo;", "'"); });

            $(".recipe-tree").scrollLeft(topNode - viewPort);
        }
    }

    onMouseUp = (d, e) => {
        this.isMoving = false;
    }

    onMouseDown = (d, e) => {
        this.isMoving = true;
        this.lastScrollLeft = $(".recipe-tree").scrollLeft();
        this.lastScrollTop = $(".recipe-tree").scrollTop();
        this.lastMouseX = e.offsetX;
        this.lastMouseY = e.offsetY;
    }

    onMouseOut = (d, e) => {
        if (this.isMoving) {
            this.isMoving = false;
        }
    }

    onMouseMove = (d, e) => {
        if (this.isMoving) {
            var diffX = this.lastMouseX - e.offsetX;
            var diffY = this.lastMouseY - e.offsetY;
            $(".recipe-tree").scrollLeft(this.lastScrollLeft + diffX);
            $(".recipe-tree").scrollTop(this.lastScrollTop + diffY);
        }
    }
}

export = TreeViewModel;