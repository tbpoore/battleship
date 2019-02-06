import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import GameContainer from "./containers/gameContainer";
import { startNewGameAction } from "./actions/gameActions";
import Menu from "./components/menu";
import PlacingShipsContainer from "./containers/placingShipsContainer";
import NextStageContainer from "./containers/nextStageContainer";
import { Stages } from "./constants";
import GameSnackbarContainer from "./containers/gameSnackbarContainer";

/*
 * mapDispatchToProps
 */
const mapDispatchToProps = dispatch => ({
  startNewGameAction: () => dispatch(startNewGameAction())
});

/*
 * mapStateToProps
 */
const mapStateToProps = state => ({
  stage: state.game.stage
});

class App extends Component {
  render() {
    const { stage } = this.props;
    return (
      <div className="App">
        <GameSnackbarContainer />
        <NextStageContainer />
        {stage === Stages.MENU && (
          <Menu startNewGame={this.props.startNewGameAction} />
        )}
        {stage === Stages.PLACING_SHIPS && <PlacingShipsContainer />}
        {stage === Stages.GAME && <GameContainer />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
