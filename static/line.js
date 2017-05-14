import * as d3 from 'd3'

/*
One Source Of Truth:
The D3 visualization should get all of the data it needs to render passed down to it.

Stateless All The Things:
D3 and React components alike should be as stateless as possible
*/
const d3Line = {}

d3Line.init = (el, props, data) => {
  // define svg element
  var svg = d3.select(el).append('svg')
    .attr('class', 'lineGraph')
    .attr('width', props.width)
    .attr('height', props.height)
    .append("g")
      .attr('class', 'line')
      .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

    d3Line.render(el, props, data)
}

d3Line.render = (el, props, data) => {

  console.log(data)
  data = Object.values(data)
  const formatDate = d3.timeParse('%a %b %d %Y %I:%M:%S')

  data.forEach(function(d) {
    d.formatedDate = formatDate(d.date)
  })

  const x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.formatedDate })).range([0, props.width])
    // linear scale over the y axis
  const y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.payment })]).range([props.height, 0])

   // construct a new line generator
  const line = d3.line().x(function (d) { return x(d.formatedDate) }).y(function(d) { return y(d.payment) }).curve(d3.curveMonotoneX)


  const path = d3.select(el).select('.line').selectAll('path')

  path.enter().append('path')
    .attr('d', line(data))

  path.exit().remove()
}

export default d3Line
