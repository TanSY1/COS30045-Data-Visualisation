function init(){
    
    var w = 500;
    var h =300;

    var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w /2, h /2])
                    .scale(3000);

    var path = d3.geoPath()
                .projection(d3.geoAlbersUsa());

    var color = d3.scaleQuantize()
                .range(['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f']);

    var svg = d3.select("#MapOnPage")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("fill", "grey")

    d3.json("LGA_VIC.json").then(function(json){

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path);
    });

    d3.csv("VIC_city.csv", function(data){
        
    })
}

window.onload = init;
