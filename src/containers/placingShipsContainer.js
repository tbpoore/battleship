import { connect } from 'react-redux';
import { onPlaceShipHoverAction, onPlaceShipClickAction, onPlaceShipRotateAction } from '../actions/gameActions';
import PlacingShips from '../components/placingShips';

/*
 * mapDispatchToProps
 */
const mapDispatchToProps = dispatch => ({
  onPlaceShipHoverAction: squareData => dispatch(onPlaceShipHoverAction(squareData)),
  onPlaceShipClickAction: squareData => dispatch(onPlaceShipClickAction(squareData)),
  onPlaceShipRotateAction: () => dispatch(onPlaceShipRotateAction())
});

/*
 * mapStateToProps
 */
const mapStateToProps = state => ({
  gameBoard: state.game.gameBoard,
  playerBoards: state.game.playerBoards,
  currentPlayerId: state.game.currentPlayerId,
  placingShips: state.game.placingShips
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacingShips);
