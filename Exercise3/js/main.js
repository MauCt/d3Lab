function read(data) {
    data.forEach(item => {
      item.age = parseInt(item.age)
      item.height = parseInt(item.height)
    })
    return data
  }
  
  // CSV
  d3.csv("https://raw.githubusercontent.com/gcastillo56/d3Lab/master/resources/data/ages.csv").then(data => {
    read(data)
  }).catch(error => console.log(error))
  
  // TSV
  d3.tsv("https://raw.githubusercontent.com/gcastillo56/d3Lab/master/resources/data/ages.tsv").then(data => {
    read(data)
  }).catch(error => console.log(error))
  
  // JSON
  d3.json("https://raw.githubusercontent.com/gcastillo56/d3Lab/master/resources/data/ages.json").then(data => {
    data = read(data)
  
    let ages = []
    data.forEach(curr => ages.push(curr.age))
  
    const svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 200)
    const circles = svg.selectAll("cirlce").data(ages)
  
    circles.enter()
            .append("circle")
            .attr("cx", (d, i) => {
              return (i * 60) + 70
            })
            .attr("cy", 100)
            .attr("r", d => { return d })
            .attr("fill", d => {
              if (d > 10) return "#1C5748"
              else return "#049B9E"
            })
  
  }).catch(error => console.log(error))
  

