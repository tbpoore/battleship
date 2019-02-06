import React, { Component } from "react";
import GameBoard from "../components/gameBoard";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import KeyHandler, { KEYPRESS } from "react-key-handler";

/**
 * @class PlacingShips
 * @extends {Component}
 */
class PlacingShips extends Component {
  /**
   * @memberof PlacingShips
   * @summary handle board square hover actions
   */
  onPlaceShipHoverAction = squareData => {
    this.props.onPlaceShipHoverAction(squareData);
  };

  /**
   * @memberof PlacingShips
   * @summary handle board placing shipclick actions
   */
  onPlaceShipClickAction = squareData => {
    this.props.onPlaceShipClickAction(squareData);
  };

  /**
   * @memberof PlacingShips
   * @summary handle ship rotation
   */
  onPlaceShipRotateAction = event => {
    event.preventDefault();
    this.props.onPlaceShipRotateAction();
  };

  render() {
    return (
      <div className="PlacingShips">
        <React.Fragment>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyValue="Enter"
            onKeyHandle={this.onPlaceShipRotateAction}
          />
          <Typography variant="h4" gutterBottom>
            Player {this.props.currentPlayerId}: Place your ships!
          </Typography>
          <GameBoard
            currentPlayerId={this.props.currentPlayerId}
            gameBoard={this.props.gameBoard}
            playerBoards={this.props.playerBoards}
            onSquareHover={this.onPlaceShipHoverAction}
            onSquareClick={this.onPlaceShipClickAction}
          />
          <Typography variant="h6">
            Tip: Use enter key to rotate ship
          </Typography>
        </React.Fragment>
      </div>
    );
  }
}

PlacingShips.propTypes = {
  currentPlayerId: PropTypes.string.isRequired,
  gameBoard: PropTypes.array.isRequired,
  onPlaceShipHoverAction: PropTypes.func,
  onPlaceShipClickAction: PropTypes.func
};

export default PlacingShips;
