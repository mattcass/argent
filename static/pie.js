import * as d3 from 'd3'

/*
One Source Of Truth:
The D3 visualization should get all of the data it needs to render passed down to it.

Stateless All The Things:
D3 and React components alike should be as stateless as possible
*/

const d3Pie = {}

d3Pie.create = (el, props, data) => {

  // define svg element
  var svg = d3.select(el).append('svg')
    .attr('class', 'pie')
    .attr('width', props.width)
    .attr('height', props.height)
    .append("g")
      .attr('class', 'arcs')
      .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

    d3Pie.update(el, props, data)
}

d3Pie.update = (el, props, data) => {

const color = d3.scaleOrdinal().range(["#253F4C", "#228AA5"])

const pie = d3.pie()
              .sort(null)
              .value(function(d) {
                return d;
              })


const radius = Math.min(props.width, props.height) / 2;

const arc = d3.arc()
              .outerRadius( radius - 10)
              .innerRadius(0)

  // parse the data
  data.forEach(function(d) {
    d = +d
  })



  // append g elements to arc
  var g = d3.select(el).selectAll('.arcs');
  var slice = g.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc')

  // append the path of the arc
  slice.append('path')
    .attr('d', arc)
    .style("fill", function(d) { return color(d.data) })
}


d3Pie.destroy = function(el) {
  // Any clean-up would go here
};

export default d3Pie
