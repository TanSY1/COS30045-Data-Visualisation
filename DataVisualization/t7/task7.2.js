function init() {
    var w = 300;
    var h = 300;

    var outerRadius = w/2;
    var innerRadius = 0;

    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

    var dataset =[5, 6, 10, 20, 25, 45];
    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#piechart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    arcs.append("path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", arc);
        
    arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.data;
    });
//-------------------------------------------------------------------
var w = 300;
    var h = 300;

    var outerRadius = w/2;
    var innerRadius = w/3;

    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

    var dataset =[5, 6, 10, 20, 25, 45];
    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#doughnut")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    arcs.append("path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", arc);
        
    arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.data;
    });
}



window.onload = init;
