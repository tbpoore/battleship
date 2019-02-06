import React, { Component } from "react";
import { SquareStatus } from "../constants";
import crosshairs from "../sprites/crosshairs.svg";
import Button from "@material-ui/core/Button";

/**
 * @class Square
 * @extends {Component}
 */
class Square extends Component {
  handleHover = event => {
    if (this.props.onSquareHover) {
      this.props.onSquareHover(this.props.data);
    }
  };

  handleClick = event => {
    if (this.props.onSquareClick) {
      this.props.onSquareClick(this.props.data);
    }
  };

  render() {
    const { data, opponent } = this.props;

    let squareClasses = "Square-open";

    switch (data.status) {
      case SquareStatus.OPEN:
        squareClasses = "Square-open";
        break;
      case SquareStatus.SHIP:
        if (!opponent) {
          squareClasses = "Square-ship";
        }
        break;
      case SquareStatus.HIT:
        squareClasses = "Square-hit";
        break;
      case SquareStatus.MISS:
        squareClasses = "Square-miss";
        break;
      default:
        squareClasses = "Square-open";
        break;
    }

    return (
      <td
        className={squareClasses}
        onMouseEnter={this.handleHover}
        onClick={this.handleClick}
      >
        <Button centerRipple={true} className="Square-button">
          <img
            src={crosshairs}
            className="Square-crosshairs"
            alt="crosshairs"
          />
        </Button>
      </td>
    );
  }
}

export default Square;
