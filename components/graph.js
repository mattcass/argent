import React from 'react'
import * as d3 from "d3"
import ReactDOM from 'react'
const window = window || global

export default class Graph extends React.Component {
  static defaultProps = {
    width: 400,
    height: 400 * 0.8,
    chartId: 'chart'
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    chartId: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
  }

  state = {
    width: this.props.width
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', () => this.updateSize())
  }


  componentDidUpdate() {
    this.renderAxis(Object.values(this.props.data));
  }

  componentDidMount() {
    this.renderAxis(Object.values(this.props.data))
    this.updateSize();
    window.addEventListener('resize', () => this.updateSize())
  }

  updateSize = () => {
    var nodeWidth = this.node.offsetWidth
    this.setState({
      width: nodeWidth
    })
  }

  renderAxis = (data) =>  {
    // pull this variables to global scope REFACTOR
    // scale over time along the x axis
    const margin = {top: 10, right: 150, bottom: 50, left: 0}
    const w = this.state.width - (margin.left + margin.right)
    const h = (this.state.width * 0.8) - (margin.top + margin.bottom)
    const x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.formatedDate })).range([0, w])
    // linear scale over the y axis
    const y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.payment  + 50})]).range([h, 0])

    const yAxis = d3.axisLeft().scale(y)
    const xAxis = d3.axisBottom().scale(x)
    d3.select(this.xAxis).call(xAxis);
    d3.select(this.yAxis).call(yAxis);
  }

  render() {
    const margin = {top: 10, right: 150, bottom: 50, left: 0}
    const w = this.state.width - (margin.left + margin.right)
    const h = (this.state.width * 0.8) - (margin.top + margin.bottom)
    // map the data to an array
    // Object.values = returns an array of a given object's own enumerable property values
    const data = Object.values(this.props.data)

    // format the human readable date back to a machine date
    const formatDate = d3.timeParse('%a %b %d %Y %I:%M:%S')
    data.forEach(function(d) {
      d.formatedDate = formatDate(d.date)
    })

   // scale over time along the x axis
   const x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.formatedDate })).range([0, w])

    // linear scale over the y axis
   const y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.payment  + 50})]).range([h, 0])

   // construct a new line generator
   const line = d3.line().x(function (d) { return x(d.formatedDate) }).y(function(d) { return y(d.payment) })

   // construct associated data points
   const circles = data.map(function(d, i) {
     return (
       <circle className="dot"
          r="7"
          cx={x(d.formatedDate)}
          cy={y(d.payment)}
          key={i}
          strokeWidth="5px"
        />
      )
    })

    const translateChart = `translate(50, -50)`
    const translate = `translate(0, ${h})`

    return (
      <section className="graph-container" ref={(node) => {this.node = node }}>
        <svg id={this.props.chartId} width={this.state.width} height={(this.state.width * 0.7)}>
          <g transform={translateChart}>
            <path className="line shadow" d={line(data)} />
            <g className="axis"  data-height={h} ref={(yAxis) => this.yAxis = yAxis }></g>
            <g className="axis" data-height={h} transform={translate} ref={(xAxis) => this.xAxis = xAxis }></g>
            <g>{circles}</g>
          </g>
        </svg>
        <style>{`
          .graph-container {
            width: 50%;
            min-width: 400px;
          }
          .axis path,
          .axis line {
            fill: none;
            stroke: grey;
            stroke-width: 1;
            shape-rendering: crispEdges;
          }
          .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 2px;
          }
          .dot {
            fill: steelblue;
            stroke: #FFF;
          }
          .rect {
            stroke: #000;
            fill: steelblue;
          }
       `}</style>
      </section>
    )
  }
}
