var w = 500;
		var h = 150;
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

		//Add
		d3.select(".button1")
		.on("click", function() {
		
			var newNumber = Math.floor(Math.random()* 25);
			dataset.push(newNumber);

			xScale.domain(d3.range(dataset.length));

			var bars = svg.selectAll("rect")
				.data(dataset);
			
			bars.enter()
				.append("rect")
				.attr("x", w)
				.attr("y", function(d){
					return h - yScale(d);
				})
				.merge(bars)
				.transition()
				.duration(500)
				.attr("x", function(d, i){
					return xScale(i)
				})
				.attr("y", function(d){
					return h - yScale(d);
				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d){
					return yScale(d);
				})	

				var texts = svg.selectAll("text")
					.data(dataset);

				texts.enter()
					.append("text")
					.attr("fill", "black")
					.attr("text-anchor", "middle")
					.merge(texts)
					.transition()
					.duration(500)
					.text(function(d){
						return d;
					})
					.attr("x", function(d, i){
						return xScale(i) + xScale.bandwidth() / 2;
					})
					.attr("y", function(d){
						return yScale(d) - 5;
					});

		});

		//remove
		d3.select(".button2")
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
				.duration(500)
				.remove();

				// Update remaining text
				texts.transition()
				.duration(500)
				.text(function(d) {
					return d;
				})
				.attr("x", function(d, i) {
					return xScale(i) + xScale.bandwidth() / 2;
				})
				.attr("y", function(d) {
					return yScale(d) - 5;
				});
		});