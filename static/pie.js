import * as d3 from 'd3'

/*
One Source Of Truth:
The D3 visualization should get all of the data it needs to render passed down to it.

Stateless All The Things:
D3 and React components alike should be as stateless as possible
*/

const d3Pie = {}

d3Pie.init = (el, props, data) => {

  // define svg element
  var svg = d3.select(el).append('svg')
    .attr('class', 'pie')
    .attr('width', props.width)
    .attr('height', props.height)


    svg.append("g")
      .attr('class', 'arcs')
      .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

    svg.append('g')
      .attr('class', 'text')

    d3Pie.render(el, props, data)
}

d3Pie.render = (el, props, data) => {

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

  data.forEach(function(d) {
    d = +d
  })


  var path = d3.select(el).select('.arcs').selectAll('path').data(pie(data))

  path.enter().append('path')
    .attr("fill", function(d, i) { return color(i) })
    .each(function(d) {this.current = d;} );

  path.transition()
    .duration(750)
    .attrTween('d', arcTween)

  path.exit().remove()

  function arcTween(a) {
    var i = d3.interpolate(this.current, a);
      this.current = i(0);
      return function(t) {
        return arc(i(t));
    };
  }

  var text = d3.select(el).select('.text').selectAll('text').data(['spent', 'budget'])

  text.enter().append('text')
    .text(function(d) {
      return d
    })
    .attr("transform", "translate(10,20)")
    .attr("x", 5)   //Move the text from the start angle of the arc
	  .attr("dy", 18)
    .attr('class', 'label')

}

export default d3Pie
