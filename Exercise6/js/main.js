const margin = {top: 10, right: 10, bottom: 100, left: 100}
const width = 600, height = 500

const g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

const x = d3.scaleBand().range([0, height]).padding(0.2)
const y = d3.scaleLinear().range([0, height])
const y_axis = g.append("g").attr("class", "y axis")
const x_axis = g.append("g").attr("class", "x axis").attr("transform", "translate(0, " + height + ")")

const y_label = g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2))
	.attr("y", -70)
	.attr("font-size", "15px")
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")

const x_label =	g.append("text")
	.attr("class", "x axis-label")
	.attr("x", (width / 2) - 70)
	.attr("y", height + 70)
	.attr("font-size", "15px")

let flag = true

// Obtain Data
// ***********
d3.json("https://raw.githubusercontent.com/gcastillo56/d3Lab/master/projects/brewery/data/revenues.json").then(data => {
  parse(data)
	d3.interval(() => {
		update(data)
		flag = !flag
	}, 1000)
}).catch(error => print(error))

// Update Data
// ***********
function update(data) {

	// Init Variabes
	let data_bars = flag ? "revenue" : "profit"
	let yLabel = flag ? "Revenue (dlls.)" : "Profit (dlls.)"
	let data_labels = "month"

	const labels = data.map(d => d[data_labels])
	const max = d3.max(data, d => d[data_bars])
	y.domain([max, 0])
	x.domain(labels)

	// Join
	rect = g.selectAll("rect").data(data)
	// Exit
	rect.exit().remove()
	// Update
	rect
		.attr("x", (d, i) => x(d[data_labels]))
		.attr("y", d => y(d[data_bars]))
		.attr("width", d => x.bandwidth())
		.attr("height", d => height - y(d[data_bars]))
	// Enter
	rect.enter().append("rect")
		.attr("x", (d, i) => x(d[data_labels]))
		.attr("y", d => y(d[data_bars]))
		.attr("width", d => x.bandwidth())
		.attr("height", d => height - y(d[data_bars]))
		.attr("fill", (d, i) => d3.interpolatePuBuGn(i/10 + 0.1) )

	configAxisAndLabels(x, y, "#fff", yLabel, "Months")

}

// Config Axis & Labels
// *********************
function configAxisAndLabels(x, y, color, yLabel, xLabel) {

	// Y Axis
	const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => d + " m")
	y_axis.call(yAxis).selectAll("text").style("fill", color)

	// X Axis
	const xAxis = d3.axisBottom(x)
	x_axis.call(xAxis).selectAll("text").style("fill", color)
		.attr("y", "10").attr("x", "-5")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-45)")

	// Axis Color
	g.selectAll(".y.axis line").style("stroke", color)
	g.selectAll(".y.axis path").style("stroke", color)
	g.selectAll(".x.axis line").style("stroke", color)
	g.selectAll(".x.axis path").style("stroke", color)

	// Labels
	y_label.text(yLabel).style("fill", color)
	x_label.text(xLabel).style("fill", color)

}

// Parse Integers
// **************
function parse(data) {
  data.forEach(item => {
    Object.keys(item).forEach(curr => {
      if (!isNaN(item[curr])) item[curr] = parseInt(item[curr])
    })
  })
  return data
}
