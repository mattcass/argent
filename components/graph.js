import * as d3 from "d3"
const window = window || global

export default class Graph extends React.Component {
  static defaultProps = {
    width: 400,
    height: 400,
    chartId: 'chart',
    margin: {top: 0, right: 50, bottom: 20, left: 50},
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    chartId: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
  }

  state = {
    width: this.props.width,
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
    const x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.formatedDate })).range([0, (this.state.width - this.props.margin.right)])
    // linear scale over the y axis
    const y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.payment + 50})]).range([(this.props.height - this.props.margin.bottom) , 0])

    const yAxis = d3.axisLeft().scale(y).tickArguments([7])
    const xAxis = d3.axisBottom().scale(x)
    d3.select(this.xAxis).call(xAxis);
    d3.select(this.yAxis).call(yAxis);
  }

  render() {
    // map the data to an array
    // Object.values = returns an array of a given object's own enumerable property values
    const data = Object.values(this.props.data)

    // format the human readable date back to a machine date
    const formatDate = d3.timeParse('%a %b %d %Y %I:%M:%S')
    data.forEach(function(d) {
      d.formatedDate = formatDate(d.date)
    })

   // scale over time along the x axis
    const x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.formatedDate })).range([0, (this.state.width - this.props.margin.right)])

    // linear scale over the y axis
   const y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.payment  + 50})]).range([(this.props.height - this.props.margin.bottom) , 0])

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

    const translateChart = `translate(40, 0)`
    const translate = `translate(0, 0)`

    return (
      <section className="graph-container" ref={(node) => {this.node = node }}>
        <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
          <g transform={translateChart}>
            <path className="line shadow" d={line(data)} />
            <g className="axis"  ref={(yAxis) => this.yAxis = yAxis }></g>
            <g className="axis" ref={(xAxis) => this.xAxis = xAxis }></g>
            <g>{circles}</g>
          </g>
        </svg>
        <style>{`
          .graph-container {
            background: #31343D;
          }
          text {
            fill: #fff;
            font-size: 14px;
          }
          .axis path,
          .axis line {
            stroke: transparent;
          }
          tick {
            fill: transparent;
          }
          .line {
            fill: none;
            stroke: #238BA6;
            stroke-width: 3px;
          }
          .dot {
            fill: #238BA6;
            stroke: #31343D;
          }
          .rect {
            stroke: #000;
            fill: #238BA6;
          }
       `}</style>
      </section>
    )
  }
}
