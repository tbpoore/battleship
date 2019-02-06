import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "../logo.svg";

/**
 * @class Menu
 * @extends {Component}
 */
class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h1" gutterBottom>
          Battleship
        </Typography>
        <Button
          onClick={this.props.startNewGame}
          variant="outlined"
          size="large"
          color="primary"
        >
          Start New Game
        </Button>
      </div>
    );
  }
}

Menu.propTypes = {
  startNewGame: PropTypes.func.isRequired
};

export default Menu;
