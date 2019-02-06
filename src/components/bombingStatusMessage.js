import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 6;
  const left = 35;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    textAlign: "center",
    position: "absolute",
    width: theme.spacing.unit * 55,
    backgroundColor: "#fd5757",
    boxShadow: theme.shadows[5],
    outline: "none"
  }
});

class BombingStatusMessage extends Component {
  handleFinishedShowing = () => {
    this.props.onFinishedShowing();
  };

  render() {
    const { classes, message } = this.props;

    if (message) {
      setTimeout(this.handleFinishedShowing, 4500);
    }

    return (
      <div>
        <Modal open={message !== ""} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography style={{ color: "#ffffff" }} variant='h2' id='modal-title'>
              {message}
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(BombingStatusMessage);
