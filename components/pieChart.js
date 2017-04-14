import d3Pie from '../static/pie'


export default class Pie extends React.Component {
  static defaultProps = {
    width: 350,
    height: 350
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired
  }

  componentDidMount() {
    var el = this.element
    d3Pie.create(el, {
      width: this.props.width,
      height: this.props.height
    }, this.getData())

  }

  componentDidUpdate(prevProps, prevState) {
    var el = this.element
    d3Pie.update(el, {
      width: this.props.width,
      height: this.props.height
    }, this.getData())

    return false
  }

  getData = () => {
    const data = this.props.data

    console.log(data)
    return data
  }

  render() {
    return (
      <div className="graph" ref={(element) => this.element = element}>
      <style>{`
        .graph {
          padding: 2em 4em;
        }
        .arc {
          stroke-width: 0;
        }
        .arc path {
          stroke: #fff;
          stroke-width: 2px;
        }
     `}</style>
      </div>
    )
  }
}
