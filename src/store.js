import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { ShipOrientation } from "./constants";
import rootReducer from "./reducers/rootReducer";

const ships = {
  1: {
    id: 1,
    size: 3,
    orientation: ShipOrientation.HORIZONTAL,
    squareIds: []
  },
  2: {
    id: 2,
    size: 2,
    orientation: ShipOrientation.HORIZONTAL,
    squareIds: []
  }
};

const initialGameState = {
  game: {
    stage: "MENU",
    boardSize: 6,
    currentPlayerId: "1",
    opponentPlayerId: "2",
    currentHoverSquareId: "",
    snack: {
      open: true,
      message: "",
      actionMessage: ""
    },
    playerBoards: {
      1: {},
      2: {}
    },
    ships: {
      ...ships
    },
    currentShipId: "1",
    playerShips: {
      1: {
        ...ships
      },
      2: {
        ...ships
      }
    }
  }
};

export default function configureStore(initialState = initialGameState) {
  return createStore(rootReducer, initialState, applyMiddleware(logger));
}
