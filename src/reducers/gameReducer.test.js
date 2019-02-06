import reducer from "./gameReducer";
import expect from "expect";
import {
  startNewGameAction,
  onPlaceShipHoverAction
} from "../actions/gameActions";

const getCleanInitialState = () => {
  return {
    stage: "PLACING_SHIPS",
    boardSize: 4,
    currentPlayerId: "1",
    opponentPlayerId: "2",
    bombingStatusMessage: "",
    playerBoards: {
      "1": {
        "0_0": { id: "0_0", status: "OPEN" },
        "0_1": { id: "0_1", status: "OPEN" },
        "0_2": { id: "0_2", status: "OPEN" },
        "0_3": { id: "0_3", status: "OPEN" },
        "1_0": { id: "1_0", status: "OPEN" },
        "1_1": { id: "1_1", status: "OPEN" },
        "1_2": { id: "1_2", status: "OPEN" },
        "1_3": { id: "1_3", status: "OPEN" },
        "2_0": { id: "2_0", status: "OPEN" },
        "2_1": { id: "2_1", status: "OPEN" },
        "2_2": { id: "2_2", status: "OPEN" },
        "2_3": { id: "2_3", status: "OPEN" },
        "3_0": { id: "3_0", status: "OPEN" },
        "3_1": { id: "3_1", status: "OPEN" },
        "3_2": { id: "3_2", status: "OPEN" },
        "3_3": { id: "3_3", status: "OPEN" }
      },
      "2": {
        "0_0": { id: "0_0", status: "OPEN" },
        "0_1": { id: "0_1", status: "OPEN" },
        "0_2": { id: "0_2", status: "OPEN" },
        "0_3": { id: "0_3", status: "OPEN" },
        "1_0": { id: "1_0", status: "OPEN" },
        "1_1": { id: "1_1", status: "OPEN" },
        "1_2": { id: "1_2", status: "OPEN" },
        "1_3": { id: "1_3", status: "OPEN" },
        "2_0": { id: "2_0", status: "OPEN" },
        "2_1": { id: "2_1", status: "OPEN" },
        "2_2": { id: "2_2", status: "OPEN" },
        "2_3": { id: "2_3", status: "OPEN" },
        "3_0": { id: "3_0", status: "OPEN" },
        "3_1": { id: "3_1", status: "OPEN" },
        "3_2": { id: "3_2", status: "OPEN" },
        "3_3": { id: "3_3", status: "OPEN" }
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
    gameBoard: [
      ["0_0", "0_1", "0_2", "0_3"],
      ["1_0", "1_1", "1_2", "1_3"],
      ["2_0", "2_1", "2_2", "2_3"],
      ["3_0", "3_1", "3_2", "3_3"]
    ]
  };
};

describe("game reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should handle startNewGameAction and reset current players and put stage into PLACING_SHIPS", () => {
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

  describe("PLACING SHIPS", () => {
    it("should handle onPlaceShipHoverAction and update player ship squares based on currentShipId and currentPlayerId", () => {
      const initState = getCleanInitialState();
      const hoverSquare = { id: "0_1", status: "OPEN" };
      expect(
        reducer(initState, onPlaceShipHoverAction(hoverSquare))
          .playerShips[1][1]
      ).toEqual({
        id: 1,
        orientation: "HORIZONTAL",
        size: 3,
        squareIds: ["0_0", "0_1", "0_2"]
      });
    });
  });
});
