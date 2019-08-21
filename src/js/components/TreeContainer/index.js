import d3 from "d3"
import React, {Component} from "react"

import "./index.css"
class TreeContainer extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.createBarChart(nextProps.data, nextProps.id)
        }
    }

    // static getDerivedStateFromProps () {
    //     if (this.props.visible) {
    //         this.createBarChart(this.props.data, this.props.id)
    //     }
    // }


    createBarChart = (treeData, id) => {
        // ************** Generate the tree diagram	 *****************
        let margin = {top: 40, right: 20, bottom: 20, left: 20},
            width = 2000 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom

        let i = 0

        let tree = d3.layout.tree()
            .size([height, width])

        let diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.x, d.y]
            })

        d3.select("svg").remove() // remove all svg element

        let  svg = d3.select(id).append("svg")
            .attr("width", 2000)
            .attr("height", 1050)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        update(treeData)

        function update(source) {

            // Compute the new tree layout.
            let  nodes = tree.nodes(treeData).reverse(),
                links = tree.links(nodes)

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                d.y = d.depth * 100
            })

            // d3.select("svg").remove()

            // Declare the nodes…
            let  node = svg.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++i)
                })

            // Enter the nodes.
            let  nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")"
                })

            nodeEnter.append("circle")
                .attr("r", 10)
                .style("fill", "#fff")

            nodeEnter.append("text")
                .attr("y", function (d) {
                    return d.children || d._children ? -18 : 18
                })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.name
                })
                .style("fill-opacity", 1)

            // Declare the links…
            let  link = svg.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id
                })

            // Enter the links.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", diagonal)
        }
    }

    render() {
        return null
    }
}

export default TreeContainer

