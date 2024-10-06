var w = 500;
var h = 300;
var barPadding = 3;
	
var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

var xScale = d3.scaleBand()
				.domain(d3.range(dataset.length))
				.rangeRound([0,w])
				.paddingInner(0.05);

var yScale = d3.scaleLinear()
				.domain([0, d3.max(dataset)])
				.range([h, 20]);

var svg = d3.select("body")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("fill", "slategrey");
		
	svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", function(d, i){
				return xScale(i);
			})
			.attr("y", function(d){
				return yScale(d);
			})
			.attr("width", xScale.bandwidth())
			
			.attr("height", function(d){
				return h - yScale(d);
			})
            .on("mouseover", function(event, d){
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() /3;
                var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
                svg.append("text")
                    .attr("id","tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .text(d);
                    
                d3.select(this)
                        .attr("fill", "orange");
            })
          
            .on("mouseout", function(d) {
                d3.select("#tooltip").remove();
                d3.select(this)
                    .transition() 
                    .attr("fill", "slategrey"); // Return to original color
            });
        
	
		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.attr("fill", "black")
			.attr("text-anchor", "middle")
			.attr("x", function(d, i){
				return xScale(i) + xScale.bandwidth() / 2; 
			})
			.attr("y", function(d){
				return yScale(d) - 5; 
			});

		//Add
		d3.select(".add")
		.on("click", function() {
		
			var newNumber = Math.floor(Math.random()* 25);
			dataset.push(newNumber);

			xScale.domain(d3.range(dataset.length));

			var bars = svg.selectAll("rect")
				.data(dataset);
			
			bars.enter()
				.append("rect")
				.attr("x", w)
				.attr("y", h)
                .attr("height", 0) 
                .on("mouseover", function(event, d) {
					var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() /3;
					var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
					svg.append("text")
						.attr("id","tooltip")
						.attr("x", xPosition)
						.attr("y", yPosition)
						.text(d);

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "orange");
                })
				.on("mouseout", function () {
					d3.select("#tooltip").remove();
					d3.select(this)
						.transition()
						.attr("fill", "slategrey");
				})
    
				.merge(bars)
				.transition()
				.duration(500)
				.attr("x", function(d, i){
					return xScale(i)
				})
				.attr("y", function(d){
					return yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d){
					return h - yScale(d);
				})	
                

				var texts = svg.selectAll("text")
					.data(dataset);      
                    texts.exit()

				texts.enter()
					.append("text")
					.attr("fill", "black")
					.attr("text-anchor", "middle")
					.merge(texts)
					.transition()
					.attr("x", function(d, i){
						return xScale(i) + xScale.bandwidth() / 2;
					})
					.attr("y", function(d){
						return yScale(d) - 5;
					});

		});
        

		//remove
		d3.select(".remove")
		.on("click", function() {
			dataset.shift();

			xScale.domain(d3.range(dataset.length));

			var bars = svg.selectAll("rect")
     		 	.data(dataset);


			bars.exit()
				.transition()
				.duration(500)
				.attr("x", w)
				.remove();

		
		

			bars.transition()
				.duration(500)
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d) {
					return yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d) {
					return h - yScale(d);
				});

				// Update text
				var texts = svg.selectAll("text")
				.data(dataset);

				// Exit old text
				texts.exit()
				.transition()
				.remove()

				
				.attr("x", function(d, i) {
					return xScale(i) + xScale.bandwidth() / 2;
				})
				.attr("y", function(d) {
					return yScale(d) - 5;
				});
		});