import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

class GameSnackbar extends Component {
  handleSnackbarAction = () => {
    this.props.onSnackbarAction(this.props.snack);
  };

  render() {
    const { snack } = this.props;
    const showSnackbar = snack && snack.message !== "";

    return (
      <div>
        {showSnackbar && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snack.open}
            message={
              <Typography style={{ color: "#ffffff" }} variant="h4">
                {snack.message}
              </Typography>
            }
            action={[
              <Button
                key="undo"
                color="secondary"
                size="large"
                onClick={this.handleSnackbarAction}
              >
                {snack.actionMessage}
              </Button>
            ]}
          />
        )}
      </div>
    );
  }
}

export default GameSnackbar;
