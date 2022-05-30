let data = [25, 20, 15, 10, 5]

let svg = d3.select("#chart-area").append("svg")
            .attr("width", 400)
            .attr("height", 200)

let circles = svg.selectAll("cirlce")
                  .data(data)
circles.enter()
        .append("circle")
        .attr("cx", (d, i) => {
          console.log("Item " + i + " with radius " + d + ".")
          return (i * 60) + 50
        })
        .attr("cy", 100)
        .attr("r", d => { return d })
        .attr("fill", "green")


svg = d3.select("#chart-area").append("svg")
            .attr("width", 400)
            .attr("height", 200)


data = [25, 20, 15, 10, 5]


let rect = svg.selectAll("rect")
              .data(data)

rect.enter()
    .append("rect")
    .attr("x", d => {
      return (d * 10) + 30
    })
    .attr("y", 10)
    .attr("width", 40)
    .attr("height", (d, i) => {
      console.log("Item " + i + " with height " + d + ".")
      return d
    })
    .attr("fill", "green")
