import { SquareStatus, ShipOrientation, Stages } from "../constants";

const createEmptyBoard = size => {
  return Array(size)
    .fill()
    .map((_, row_index) => {
      return Array(size)
        .fill()
        .map((_, col_index) => {
          return `${row_index}_${col_index}`;
        });
    });
};

const initializePlayerBoardSquares = size => {
  const squareLookup = {};
  createEmptyBoard(size).forEach(rows => {
    rows.forEach(id => {
      squareLookup[id] = {
        id,
        status: SquareStatus.OPEN
      };
    });
  });

  return squareLookup;
};

const setPlayerShipSquares = (playerShips, playerSquares) => {
  const squares = {};
  Object.values(playerShips).forEach(playerShip => {
    playerShip.squareIds.forEach(squareId => {
      squares[squareId] = {
        ...playerSquares[squareId],
        status: SquareStatus.SHIP
      };
    });
  });

  return squares;
};

const resetPlayerSquares = playerSquares => {
  const squares = {};
  Object.keys(playerSquares).forEach(squareId => {
    squares[squareId] = {
      ...playerSquares[squareId],
      status: SquareStatus.OPEN
    };
  });

  return squares;
};

const movePlayerShip = (startingSquareId, playerShip) => {
  const shipSquareIds = {};

  const rowCols = startingSquareId.split("_");
  const currentRow = Number(rowCols[0]);
  const currentCol = Number(rowCols[1]);

  Array(playerShip.size)
    .fill()
    .forEach((_, index) => {
      let squareId;
      const midStartingPoint = Math.round(playerShip.size / 2) - 1;
      switch (playerShip.orientation) {
        case ShipOrientation.HORIZONTAL:
          squareId = `${currentRow}_${currentCol - midStartingPoint + index}`;
          break;
        case ShipOrientation.VERTICAL:
          squareId = `${currentRow - midStartingPoint + index}_${currentCol}`;
          break;
        default:
          break;
      }
      shipSquareIds[squareId] = squareId;
    });

  return {
    ...playerShip,
    squareIds: Object.keys(shipSquareIds)
  };
};

const isBombableSquare = square => {
  return square.status === SquareStatus.HIT ||
    square.status === SquareStatus.MISS
    ? false
    : true;
};

const bombSquare = square => {
  // HIT
  if (square.status === SquareStatus.SHIP) {
    return SquareStatus.HIT;
  }
  // MISS
  if (square.status === SquareStatus.OPEN) {
    return SquareStatus.MISS;
  }
};

const getBombingStatusMessage = bombedSquareStatus => {
  // HIT
  if (bombedSquareStatus === SquareStatus.HIT) {
    return "HIT!";
  }
  // MISS
  if (bombedSquareStatus === SquareStatus.MISS) {
    return "MISS!";
  }

  return "";
};

const allShipsDestroyed = (ships, playerBoard) => {
  const totalShipSquares = Object.values(ships).reduce(
    (total, ship) => total + ship.size,
    0
  );

  const totalHitSquares = Object.values(playerBoard).reduce(
    (total, square) => (square.status === SquareStatus.HIT ? total + 1 : total),
    0
  );

  return totalHitSquares >= totalShipSquares;
};

const isValidShipPlacement = (shipId, ships, boardSize) => {
  const otherShipSquares = Object.values(ships)
    .filter(ship => Number(ship.id) !== Number(shipId))
    .map(ship => ship.squareIds)
    .flat();

  // Check if any ships are intersecting
  const shipCollison = ships[shipId].squareIds.some(squareId =>
    otherShipSquares.includes(squareId)
  );

  // Check if any part of ship if off board
  const outOfBounds = ships[shipId].squareIds.some(squareId => {
    const rowCols = squareId.split("_");
    const rowIndex = Number(rowCols[0]);
    const colIndex = Number(rowCols[1]);
    const rowColOutOfBounds =
      rowIndex > boardSize - 1 ||
      rowIndex < 0 ||
      colIndex > boardSize - 1 ||
      colIndex < 0;

    return rowColOutOfBounds;
  });

  return !shipCollison && !outOfBounds;
};

export default (state = {}, action) => {
  switch (action.type) {
    case "START_NEW_GAME_ACTION":
      return {
        ...state,
        stage: Stages.PLACING_SHIPS,
        currentPlayerId: "1",
        opponentPlayerId: "2",
        currentShipId: "1",
        gameBoard: createEmptyBoard(state.boardSize),
        playerBoards: {
          1: initializePlayerBoardSquares(state.boardSize),
          2: initializePlayerBoardSquares(state.boardSize)
        },
        bombingStatusMessage: ""
      };

    case "ON_PLACE_SHIP_HOVER_ACTION":
      const hoverSquareId = action.payload.id;
      const currentPlayerId = state.currentPlayerId;
      const currentPlayerBoard = state.playerBoards[currentPlayerId];
      const currentShipId = state.currentShipId;
      const currentPlayerShips = state.playerShips[currentPlayerId];
      const currentPlayerShip = currentPlayerShips[currentShipId];

      const updatedCurrentPlayerShips = {
        ...currentPlayerShips,
        [currentShipId]: movePlayerShip(hoverSquareId, currentPlayerShip)
      };

      const updatedPlayerSquares = {
        ...currentPlayerBoard,
        ...resetPlayerSquares(currentPlayerBoard),
        ...setPlayerShipSquares(updatedCurrentPlayerShips, currentPlayerBoard)
      };

      return {
        ...state,
        playerShips: {
          ...state.playerShips,
          [currentPlayerId]: {
            ...updatedCurrentPlayerShips
          }
        },
        playerBoards: {
          ...state.playerBoards,
          [currentPlayerId]: {
            ...updatedPlayerSquares
          }
        }
      };

    case "ON_PLACE_SHIP_ROTATE_ACTION":
      const currentShip =
        state.playerShips[state.currentPlayerId][state.currentShipId];
      const updatedOrientation =
        currentShip.orientation === ShipOrientation.HORIZONTAL
          ? ShipOrientation.VERTICAL
          : ShipOrientation.HORIZONTAL;

      const rotatedPlayerShips = {
        ...state.playerShips[state.currentPlayerId],
        [state.currentShipId]: {
          ...currentShip,
          orientation: updatedOrientation
        }
      };

      const rotatedPlayerSquares = {
        ...state.playerBoards[state.currentPlayerId],
        ...resetPlayerSquares(state.playerBoards[state.currentPlayerId]),
        ...setPlayerShipSquares(
          rotatedPlayerShips,
          state.playerBoards[state.currentPlayerId]
        )
      };

      return {
        ...state,
        playerShips: {
          ...state.playerShips,
          [state.currentPlayerId]: {
            ...rotatedPlayerShips
          }
        },
        playerBoards: {
          ...state.playerBoards,
          [state.currentPlayerId]: {
            ...rotatedPlayerSquares
          }
        }
      };

    case "ON_PLACE_SHIP_CLICK_ACTION":
      if (
        !isValidShipPlacement(
          state.currentShipId,
          state.playerShips[state.currentPlayerId],
          state.boardSize
        )
      ) {
        return {
          ...state
        };
      }

      const nextShipId = Number(state.currentShipId) + 1;
      const nextShipExists =
        state.playerShips[state.currentPlayerId][nextShipId];

      // continue placing ships
      if (nextShipExists) {
        return {
          ...state,
          currentShipId: `${nextShipId}`
        };
      }

      const nextPlayerId = Number(state.currentPlayerId) + 1;
      const nextPlayerExists = state.playerBoards[nextPlayerId];

      // start placing next player ships
      if (nextPlayerExists) {
        return {
          ...state,
          currentShipId: "1", // reset current ship back for next player
          currentPlayerId: `${nextPlayerId}`
        };
      }

      // Done placing ships
      return {
        ...state,
        currentPlayerId: "1",
        stage: Stages.DONE_PLACING_SHIPS
      };

    case "PROCEED_TO_NEXT_STAGE_ACTION":
      const nextStage =
        state.stage === Stages.DONE_PLACING_SHIPS ||
        state.stage === Stages.PLAYER_TURN_FINISHED
          ? Stages.GAME
          : state.stage;
      return {
        ...state,
        stage: nextStage
      };

    case "ON_BOMB_CLICK_ACTION":
      // prevent multiple bomb clicks
      if (state.bombingStatusMessage) {
        return {
          ...state
        };
      }

      const bombedSquare =
        state.playerBoards[state.opponentPlayerId][action.payload.id];
      if (!bombedSquare || !isBombableSquare(bombedSquare)) {
        return {
          ...state
        };
      }

      const bombedSquareStatus = bombSquare(bombedSquare);
      let bombingStatusMessage = getBombingStatusMessage(bombedSquareStatus);

      const bombedShip = Object.values(
        state.playerShips[state.opponentPlayerId]
      ).filter(ship => ship.squareIds.includes(bombedSquare.id))[0];

      if (bombedShip) {
        const otherShipSquaresHit = bombedShip.squareIds
          .filter(squareId => squareId !== bombedSquare.id)
          .map(squareId => state.playerBoards[state.opponentPlayerId][squareId])
          .every(square => square.status === SquareStatus.HIT);

        if (otherShipSquaresHit) {
          bombingStatusMessage = "YOU SANK MY BATTLE SHIP!";
        }
      }

      return {
        ...state,
        bombingStatusMessage: bombingStatusMessage,
        playerBoards: {
          ...state.playerBoards,
          [state.opponentPlayerId]: {
            ...state.playerBoards[state.opponentPlayerId],
            [bombedSquare.id]: {
              ...bombedSquare,
              status: bombedSquareStatus
            }
          }
        }
      };

    case "ON_PLAYER_TURN_FINISHED_ACTION":
      if (
        allShipsDestroyed(
          state.ships,
          state.playerBoards[state.opponentPlayerId]
        )
      ) {
        return {
          ...state,
          stage: Stages.GAME_FINISHED,
          winner: state.currentPlayerId
        };
      }

      return {
        ...state,
        currentPlayerId: state.opponentPlayerId,
        opponentPlayerId: state.currentPlayerId,
        stage: Stages.PLAYER_TURN_FINISHED,
        bombingStatusMessage: ""
      };
    default:
      return state;
  }
};
