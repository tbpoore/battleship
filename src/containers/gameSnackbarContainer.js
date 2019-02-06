import { connect } from "react-redux";
import GameSnackbar from "../components/gameSnackbar";
import {
    onSnackbarCloseAction,
    onSnackbarAction
} from "../actions/gameActions";

/*
 * mapDispatchToProps
 */
const mapDispatchToProps = dispatch => ({
    onSnackbarAction: (snack) => {
        dispatch(onSnackbarCloseAction(snack));
        dispatch(onSnackbarAction(snack))
    }
});

/*
 * mapStateToProps
 */
const mapStateToProps = state => ({
  stage: state.game.stage,
  snack: state.game.snack
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameSnackbar);
