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
      times: [],
      isTiming: false,
      currentTime: 0
    }
  }

  componentDidMount() {
    this.addKeyPressListeners()
  }

  addKeyPressListeners() {
    this.props.addKeypressListener('Spacebar', () => {
      this.setState(prevState => {isTiming: !prevState.isTiming})
    });
  }

  render() {
    const {currentTime, isTiming} = this.state
    return (
      <Timer currentTime isTiming />
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
