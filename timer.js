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
      currentTime: 0
    }
    this.timer = 0;

    this.handleSpacebar = this.handleSpacebar.bind(this);
    this.props.addKeypressListener('space', this.handleSpacebar);
  }

  handleSpacebar() {
    // Stopping timer
    if (this.state.isTiming) {
      clearInterval(this.timer)
      this.setState(prevState => { return { times: [...prevState.times, this.state.currentTime] }})
    }
    // Beginning timer
    else {
      this.state.currentTime = 0
      this.timer = setInterval(() => {
        this.setState(prevState => ({currentTime: parseFloat(prevState.currentTime + .01).toFixed(2)}))
      }, 10)
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
      {props.isTiming ? "hello" : "goodbye"}

      {JSON.stringify(props)}
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
