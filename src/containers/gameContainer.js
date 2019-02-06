import { connect } from "react-redux";
import { onBombClickAction } from "../actions/gameActions";
import Game from "../components/game";

/*
 * mapDispatchToProps
 */
const mapDispatchToProps = dispatch => ({
  onBombClickAction: squareData => dispatch(onBombClickAction(squareData))
});

/*
 * mapStateToProps
 */
const mapStateToProps = state => ({
  gameBoard: state.game.gameBoard,
  playerBoards: state.game.playerBoards,
  currentPlayerId: state.game.currentPlayerId,
  opponentPlayerId: state.game.opponentPlayerId,
  placingShips: state.game.placingShips,
  stage: state.game.stage
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
