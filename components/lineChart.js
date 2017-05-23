import PropTypes from 'prop-types';
import d3Line from '../static/line';

export default class Pie extends React.Component {
  static defaultProps = {
    width: 350,
    height: 350
  };

  componentDidMount() {
    var el = this.element;

    d3Line.init(
      el,
      {
        width: this.props.width,
        height: this.props.height
      },
      this.props.data
    );
  }

  componentWillUpdate(nextProps, nextState) {
    var el = this.element;

    if (this.props.data !== nextProps.data) {
      d3Line.init(
        el,
        {
          width: this.props.width,
          height: this.props.height
        },
        nextProps.data
      );
    }

    return false;
  }

  render() {
    return (
      <div className="graph" ref={element => (this.element = element)}>
        <style>{`
        .graph {
          padding: 2em 4em;
        }
        .line {
            fill: none;
            stroke: #238BA6;
            stroke-width: 3px;
        }
      `}</style>
      </div>
    );
  }
}

Pie.PropTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
};
