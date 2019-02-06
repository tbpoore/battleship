import { SnackActions } from "../constants";

export const introAction = () => {
  return {
    type: "INTRO_ACTION",
    payload: "result_of_intro_action"
  };
};

export const startNewGameAction = () => {
  return {
    type: "START_NEW_GAME_ACTION"
  };
};

export const onBombClickAction = squareData => {
  return {
    type: "ON_BOMB_CLICK_ACTION",
    payload: squareData
  };
};

export const onPlaceShipHoverAction = squareData => {
  return {
    type: "ON_PLACE_SHIP_HOVER_ACTION",
    payload: squareData
  };
};

export const onPlaceShipClickAction = () => {
  return {
    type: "ON_PLACE_SHIP_CLICK_ACTION"
  };
};

export const onPlaceShipRotateAction = () => {
  return {
    type: "ON_PLACE_SHIP_ROTATE_ACTION"
  };
};

export const proceedToNextStageAction = () => {
  return {
    type: "PROCEED_TO_NEXT_STAGE_ACTION"
  };
};

export const onSnackbarCloseAction = snack => {
  return {
    type: "ON_SNACKBAR_CLOSE_ACTION",
    payload: snack
  };
};

export const onSnackbarAction = snack => {
  switch (snack.action) {
    case SnackActions.NEXT_PLAYER_TURN:
      return {
        type: "ON_NEXT_PLAYER_TURN_ACTION"
      };

    default:
      return {
        type: "ON_SNACKBAR_CLOSE_ACTION",
        payload: snack
      };
  }
};
