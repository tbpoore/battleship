import reducer from "./gameReducer";
import expect from "expect";
import {
  startNewGameAction,
  onPlaceShipHoverAction,
  onPlaceShipClickAction
} from "../actions/gameActions";
import { Stages } from "../constants";

const getCleanGameState = () => {
  return {
    stage: "PLACING_SHIPS",
    boardSize: 3,
    currentPlayerId: "1",
    opponentPlayerId: "2",
    currentHoverSquareId: "",
    bombingStatusMessage: "",
    playerBoards: {
      "1": {
        "0_0": { id: "0_0", status: "OPEN" },
        "0_1": { id: "0_1", status: "OPEN" },
        "0_2": { id: "0_2", status: "OPEN" },
        "1_0": { id: "1_0", status: "OPEN" },
        "1_1": { id: "1_1", status: "OPEN" },
        "1_2": { id: "1_2", status: "OPEN" },
        "2_0": { id: "2_0", status: "OPEN" },
        "2_1": { id: "2_1", status: "OPEN" },
        "2_2": { id: "2_2", status: "OPEN" }
      },
      "2": {
        "0_0": { id: "0_0", status: "OPEN" },
        "0_1": { id: "0_1", status: "OPEN" },
        "0_2": { id: "0_2", status: "OPEN" },
        "1_0": { id: "1_0", status: "OPEN" },
        "1_1": { id: "1_1", status: "OPEN" },
        "1_2": { id: "1_2", status: "OPEN" },
        "2_0": { id: "2_0", status: "OPEN" },
        "2_1": { id: "2_1", status: "OPEN" },
        "2_2": { id: "2_2", status: "OPEN" }
      }
    },
    ships: {
      "1": { id: 1, size: 3, orientation: "HORIZONTAL", squareIds: [] },
      "2": { id: 2, size: 2, orientation: "HORIZONTAL", squareIds: [] }
    },
    currentShipId: "1",
    playerShips: {
      "1": {
        "1": { id: 1, size: 3, orientation: "HORIZONTAL", squareIds: [] },
        "2": { id: 2, size: 2, orientation: "HORIZONTAL", squareIds: [] }
      },
      "2": {
        "1": { id: 1, size: 3, orientation: "HORIZONTAL", squareIds: [] },
        "2": { id: 2, size: 2, orientation: "HORIZONTAL", squareIds: [] }
      }
    },
    gameBoard: [["0_0", "0_1", "0_2"], ["1_0", "1_1", "1_2"], ["2_0", "2_1", "2_2"]]
  };
};

describe("gameReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  describe("startNewGameAction", () => {
    it("should reset current players and put stage into PLACING_SHIPS", () => {
      expect(reducer({}, startNewGameAction())).toEqual({
        bombingStatusMessage: "",
        currentPlayerId: "1",
        currentShipId: "1",
        gameBoard: [["0_0"]],
        opponentPlayerId: "2",
        playerBoards: {
          "1": { "0_0": { id: "0_0", status: "OPEN" } },
          "2": { "0_0": { id: "0_0", status: "OPEN" } }
        },
        stage: "PLACING_SHIPS"
      });
    });
  });

  describe("Placing Ships:", () => {
    describe("onPlaceShipHoverAction", () => {
      it("should update player ship squares based on currentShipId and currentPlayerId", () => {
        const state = getCleanGameState();
        const hoverSquare = { id: "0_1", status: "OPEN" };
        expect(reducer(state, onPlaceShipHoverAction(hoverSquare)).playerShips[1][1]).toEqual({
          id: 1,
          orientation: "HORIZONTAL",
          size: 3,
          squareIds: ["0_0", "0_1", "0_2"]
        });
      });
    });

    describe("onPlaceShipClickAction", () => {
      it("should increment currentShipId with valid ship placement", () => {
        const state = getCleanGameState();
        expect(reducer(state, onPlaceShipClickAction()).currentShipId).toEqual("2");
      });

      it("should not increment currentShipId when ship is out of bounds", () => {
        const state = getCleanGameState();
        const outOfBoundsSquares = ["0_-1", "0_0", "0_1"];
        state.playerShips[1][1] = {
          id: 1,
          orientation: "HORIZONTAL",
          size: 3,
          squareIds: outOfBoundsSquares
        };
        expect(reducer(state, onPlaceShipClickAction()).currentShipId).toEqual("1");
      });

      it("should not increment currentShipId when ship intersects with another ship", () => {
        const state = getCleanGameState();
        state.currentShipId = "1";
        state.playerShips[1] = {
          1: {
            id: 1,
            orientation: "HORIZONTAL",
            size: 3,
            squareIds: ["0_0", "0_1", "0_2"]
          },
          2: {
            id: 2,
            orientation: "VERTICAL",
            size: 3,
            squareIds: ["0_0", "1_0", "2_0"]
          }
        };
        expect(reducer(state, onPlaceShipClickAction()).currentShipId).toEqual("1");
      });

      it("should go to next player and reset ships current player ships are all placed", () => {
        const state = getCleanGameState();
        state.currentPlayerId = "1";
        state.currentShipId = "2"; // last ship
        const nextState = reducer(state, onPlaceShipClickAction());
        expect(nextState.currentPlayerId).toEqual("2");
        expect(nextState.currentShipId).toEqual("1");
      });

      it("should set the stage to DONE_PLACING_SHIPS when all ships have been placed", () => {
        const state = getCleanGameState();
        state.currentPlayerId = "2"; // last player
        state.currentShipId = "2"; // last ship
        const nextState = reducer(state, onPlaceShipClickAction());
        expect(nextState.stage).toEqual(Stages.DONE_PLACING_SHIPS);
        expect(nextState.currentPlayerId).toEqual("1");
      });
    });
  });
});
