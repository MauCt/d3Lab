let margin = {top: 50, right: 100, bottom: 60, left: 100}
let width = 510
let height = 515

let g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")


    d3.json("data/buildings.json").then((data)=> {
    
        console.log("Scales");
        data.forEach((d)=>{
            d.height = parseInt(d.height);
        });
        console.log(data);


  heights = data.map(d => { return d.height })
  names = data.map(d => { return d.name })

  max = d3.max(data, d => d.height)
  y = d3.scaleLinear().domain([max, 0]).range([0, 400])
  x = d3.scaleBand().domain(names).range([0, 400]).paddingInner(0.3).paddingOuter(0.3)

  margin = {top: 10, right: 10, bottom: 100, left: 100}
  width = 600
  height = 500


  g = d3.select("#chart-area")
  	.append("svg")
  		.attr("width", width + margin.right + margin.left)
  		.attr("height", height + margin.top + margin.bottom)
  	.append("g")
  		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")


  rect = g.selectAll("rect").data(data)

  rect.enter()
      .append("rect")
      .attr("x", (d, i) => x(d.name) + 20)
      .attr("y", d => y(d.height))
      .attr("width", d => x.bandwidth())
      .attr("height", d => 400 - y(d.height))
      .attr("fill", (d, i) => d3.interpolateViridis(i/10 + 0.1) )

 
  leftAxis = d3.axisLeft(y).ticks(5).tickFormat(d => d + " m")
  g.append("g")
    .attr("class", "left axis")
    .call(leftAxis)

 
  bottomAxis = d3.axisBottom(x)
  g.append("g")
  	.attr("class", "bottom axis")
  	.attr("transform", "translate(20, " + (height - 80) + ")")
  	.call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-45)")

  g.append("text")
  	.attr("class", "y axis-label")
  	.attr("x", - (height / 2))
  	.attr("y", -70)
  	.attr("font-size", "15px")
  	.attr("text-anchor", "middle")
  	.attr("transform", "rotate(-90)")
  	.style("fill","black")
  	.text("Heights (m)")


  g.append("text")
  	.attr("class", "x axis-label")
  	.attr("x", (width / 2) - 170)
  	.attr("y", height + 70)
  	.attr("font-size", "15px")
  	.style("fill","black")
  	.text("The word's tallest buildings")

}).catch(error => print(error))
