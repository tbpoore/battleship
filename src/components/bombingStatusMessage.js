import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

class BombingStatusMessage extends Component {
  handleFinishedShowing = () => {
    this.props.onFinishedShowing();
  };

  render() {
    const { message } = this.props;

    if (message) {
      setTimeout(this.handleFinishedShowing, 4500);
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={message !== ""}
          message={
            <Typography style={{ color: "#ffffff" }} variant='h4'>
              {message}
            </Typography>
          }
        />
      </div>
    );
  }
}

export default BombingStatusMessage;
