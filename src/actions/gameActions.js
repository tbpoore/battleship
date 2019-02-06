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

export const onPlaceShipClickAction = squareData => {
  return {
    type: "ON_PLACE_SHIP_CLICK_ACTION",
    payload: squareData
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

export const onPlayerTurnFinishedAction = () => {
  return {
    type: "ON_PLAYER_TURN_FINISHED_ACTION"
  };
};
