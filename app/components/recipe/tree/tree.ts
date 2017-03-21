import ko = require("knockout");
import d3 = require("d3");
import AppManager = require("../../app/manager");
import RecipeManager = require("../manager");
import Constants = require("../../../core/constants");

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
            var widthAdjust: number = 1;
            for (var i in items) {
                width += items[i].count;
                var adj = RecipeManager.getItem(items[i].id).name.length * 8 + 60;
                if (adj > widthAdjust) {
                    widthAdjust = adj;
                }
            }
            width = width || 1;
            width *= widthAdjust;
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

            node.append("rect")
                .attr("x", (d:any) => { return d.data.width / 2 * -1;})
                .attr("y", 0)
                .attr("width", (d:any) => { return d.data.width; })
                .attr("height", 34)
                .attr("style", (d:any) => {
                    return "fill:white;stroke-width:3;stroke:" + (Constants.rarityColors[d.data.rarity] || "black");
                });
            
            node.append("svg:image")
                .attr("x", (d:any) => { return d.data.width / 2 * -1; })
                .attr("y", 1)
                .attr("width", 32)
                .attr("height", 32)
                .attr("xlink:href", (d:any) => { return d.data.icon; });

            node.append("text")
                .attr("x", (d:any) => { return (d.data.width / 2 * -1) + 34; })
                .attr("y", 18)
                .style("text-anchor", "left")
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