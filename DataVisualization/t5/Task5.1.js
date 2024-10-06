var w = 500;
		var h = 350;
		var barPadding = 3;
	
		var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

		var xScale = d3.scaleBand()
						.domain(d3.range(dataset.length))
						.rangeRound([0,w])
						.paddingInner(0.05);

		var yScale = d3.scaleLinear()
						.domain([0, d3.max(dataset)])
						.range([h, 0]);

		var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h)
					.attr("fill", "rgb(106, 90, 205)");
		
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
			});
	
		svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){
			return d;
		})
		.attr("fill", "black")
		.attr("text-anchor", "middle")
		.attr("x", function(d, i){
			return xScale(i) + xScale.bandwidth() / 2; 
		})
		.attr("y", function(d){
			return yScale(d) - 5; 
		})


		d3.select(".button1")
		.on("click", function() {
			var numValues = dataset.length;
			var dataset2 = [];
			var maxValue = 25;

			for(var i = 0; i < numValues; i++) {
				var newNumber = Math.floor(Math.random() * maxValue);
				dataset2.push(newNumber);
			}

			svg.selectAll("rect")
				.data(dataset2)
				.attr("y", function(d) {
					return yScale(d);
				})
				.attr("height", function(d) {
					return h - yScale(d);
				});

			svg.selectAll("text")
				.data(dataset2)
				.text(function(d) {
					return d;
				})
				.attr("x", function(d, i) {
					return xScale(i) + xScale.bandwidth() / 2;
				})
				.attr("y", function(d) {
					return yScale(d) - 5;
				})
				.attr("text-anchor", "middle");
		})
		