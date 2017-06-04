import PropTypes from 'prop-types'
import d3Pie from '../static/pie'

export default class Pie extends React.Component {
  static defaultProps = {
    width: 350,
    height: 300
  }

  state = {
    width: this.props.width
  }

  componentDidMount() {
    var el = this.element
    this.updateSize()
    window.addEventListener('resize', () => this.updateSize())

    d3Pie.init(
      el,
      {
        width: this.state.width,
        height: this.props.height
      },
      this.props.data
    )
    this.updateSize()
    window.addEventListener('resize', () => this.updateSize())
  }

  componentWillUpdate(nextProps, nextState) {
    var el = this.element

    if (this.props.data !== nextProps.data) {
      d3Pie.render(
        el,
        {
          width: this.state.width,
          height: this.props.height
        },
        nextProps.data
      )
    }

    return false
  }

  updateSize = () => {
    var containerWidth = this.element.offsetWidth
    this.setState({
      width: containerWidth
    })
  }

  render() {
    return (
      <div className="graph" ref={element => (this.element = element)}>
        <style>{`
        .graph {
          padding: 2em 4em;
          align-self: flex-start;
        }
        .arcs path {
          stroke: #fff;
          stroke-width: 2px;
        }
        .label {
          fill: #000;
        }
     `}</style>
      </div>
    )
  }
}

Pie.PropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}
