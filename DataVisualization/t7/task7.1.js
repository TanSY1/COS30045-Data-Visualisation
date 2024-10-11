function init() {
    var w = 600;
    var h = 300;
    var margin = { top: 20, right: 40, bottom: 30, left: 50 };
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;
    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        dataset = data;
        lineChart(dataset);
        console.table(dataset, ["date", "number"]);
    });

    function lineChart(dataset) {
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([height, 0]);

        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });

        var area=d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(function() { return yScale.range()[0]; })
            .y1(function(d) { return yScale(d.number); });


        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area);

        svg.append("line")
            .attr("class", "halfMilMark")
            .attr("x1", 0) 
            .attr("y1", yScale(500000)) 
            .attr("x2", width) 
            .attr("y2", yScale(500000)) 
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5"); 

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", 10) 
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("fill", "red")
            .style("font-size", "12px");

        var xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        var yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }
}

window.onload = init;
