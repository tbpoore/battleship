import React, { Component } from "react";
import PropTypes from "prop-types";
import { Stages } from "../constants";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

/**
 * @class NextStage
 * @extends {Component}
 */
class NextStage extends Component {
  handleProceedClick = event => {
    this.props.proceedToNextStageAction();
  };

  handleStartNewGameClick = event => {
    this.props.startNewGameAction();
  };

  render() {
    const { stage, currentPlayerId, winner } = this.props;
    return (
      <div className="NextStage">
        {stage === Stages.DONE_PLACING_SHIPS && (
          <>
            <Typography variant="h2" gutterBottom>
              DONE PLACING SHIPS
            </Typography>
            <Button
              onClick={this.handleProceedClick}
              variant="outlined"
              size="large"
              color="primary"
            >
              Player {currentPlayerId} Continue
            </Button>
          </>
        )}
        {stage === Stages.PLAYER_TURN_FINISHED && (
          <>
            <Typography variant="h2" gutterBottom>
              NEXT TURN: PLAYER {currentPlayerId}
            </Typography>
            <Button
              onClick={this.handleProceedClick}
              variant="outlined"
              size="large"
              color="primary"
            >
              Player {currentPlayerId} Continue
            </Button>
          </>
        )}
        {stage === Stages.GAME_FINISHED && (
          <>
            <Typography variant="h2" gutterBottom>
              PLAYER {winner} HAS WON!
            </Typography>
            <Button
              onClick={this.handleStartNewGameClick}
              variant="outlined"
              size="large"
              color="primary"
            >
              New Game
            </Button>
          </>
        )}
      </div>
    );
  }
}

NextStage.propTypes = {
  stage: PropTypes.string,
  currentPlayerId: PropTypes.string,
  winner: PropTypes.string,
  startNewGameAction: PropTypes.func,
  proceedToNextStageAction: PropTypes.func.isRequired
};

export default NextStage;
