import React, { Component } from "react";
import PropTypes from "prop-types";
import GameBoard from "../components/gameBoard";
import Typography from "@material-ui/core/Typography";

/**
 * @class Game
 * @extends {Component}
 */
class Game extends Component {
  /**
   * @memberof Game
   * @summary handle board square bomb click actions
   */
  onBombClickAction = squareData => {
    this.props.onBombClickAction(squareData);
  };
  
  render() {
    return (
      <div className="Game">
        <div className="Game-opponent">
          <Typography variant="h4" gutterBottom>
            Opponents Board
          </Typography>
          <GameBoard
            opponent={true}
            currentPlayerId={this.props.opponentPlayerId}
            gameBoard={this.props.gameBoard}
            playerBoards={this.props.playerBoards}
            onSquareClick={this.onBombClickAction}
          />
        </div>
        <div className="Game-currentPlayer">
          <Typography variant="h4" gutterBottom>
            Your Board
          </Typography>
          <GameBoard
            currentPlayerId={this.props.currentPlayerId}
            gameBoard={this.props.gameBoard}
            playerBoards={this.props.playerBoards}
          />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  gameBoard: PropTypes.array,
  playerBoards: PropTypes.object,
  currentPlayerId: PropTypes.string.isRequired,
  opponentPlayerId: PropTypes.string.isRequired,
  stage: PropTypes.string,
  onBombClickAction: PropTypes.func.isRequired
};

export default Game;
