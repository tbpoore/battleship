import { connect } from "react-redux";
import NextStage from "../components/nextStage";
import {
  proceedToNextStageAction,
  startNewGameAction
} from "../actions/gameActions";
/*
 * mapDispatchToProps
 */
const mapDispatchToProps = dispatch => ({
  proceedToNextStageAction: () => dispatch(proceedToNextStageAction()),
  startNewGameAction: () => dispatch(startNewGameAction())
});

/*
 * mapStateToProps
 */
const mapStateToProps = state => ({
  stage: state.game.stage,
  currentPlayerId: state.game.currentPlayerId,
  winner: state.game.winner
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextStage);
