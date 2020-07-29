import React, {Component} from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'

/**
 * Stylesheet
 */
const stylesheet = {
  bordered: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'blue'
      }
    }
  }
};

/**
 * Top level component.
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foo: "Testing",
      times: [],
      isTiming: false,
      totalElapsedSeconds: 0,
      currentTime: 0
    }
    this.timer = 0;

    this.handleSpacebar = this.handleSpacebar.bind(this);
    this.props.addKeypressListener('space', this.handleSpacebar);
    this.tick = this.tick.bind(this);
  }

  tick() {
    let totalElapsedSeconds = ((new Date().getTime() - this.state.currentTime) / 1000).toFixed(2);
    this.setState({totalElapsedSeconds})
  }

  handleSpacebar() {
    // Stopping timer
    if (this.state.isTiming) {
      clearInterval(this.timer)
      this.setState(prevState => {
        return {
          times: [
            ...prevState.times,
            prevState.totalElapsedSeconds
          ],
          currentTime: prevState.totalElapsedSeconds
        }
      })
    }
    // Beginning timer
    else {
      this.setState({ currentTime: new Date().getTime() })
      this.timer = setInterval(this.tick.bind(this), 10);
    }
    this.setState(prevState => ({ isTiming: !prevState.isTiming }))
  }

  componentDidMount() {
  }

  render() {
    return (
      <Timer
        currentTime={this.state.currentTime}
        isTiming={this.state.isTiming}
        times={this.state.times}
      />
    );
  }
}

/**
 * Timer Component
 */
const Timer = (props) => {
  return (
    <box label={"Timer"}
        class={stylesheet.bordered}
        top="30%"
        left="center"
        width="50%"
        height="35%" >

      {props.isTiming ? JSON.stringify(props) : props.currentTime}

    </box>
  );
};

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed dashboard'
});

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

render(
  <Dashboard
    addKeypressListener={(key, fn) => screen.key(key, fn)}
  />, screen
);
