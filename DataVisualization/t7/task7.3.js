function init() {
    var w = 600;
    var h = 400;   

    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    var margin = { top: 20, right: 30, bottom: 40, left: 40 };
    var innerWidth = w - margin.left - margin.right;
    var innerHeight = h - margin.top - margin.bottom;

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, innerWidth])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.apples + d.oranges + d.grapes;
        })])
        .range([innerHeight, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var stack = d3.stack()
        .keys(["apples", "oranges", "grapes"]);

    var series = stack(dataset);

    var svg = d3.select("#stackedbarchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return color(i);
        });

    var rects = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d[1]);
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth());
}

window.onload = init;
