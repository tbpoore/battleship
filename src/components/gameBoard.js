import React, { Component } from "react";
import Square from "./square";

/**
 * @class GameBoard
 * @extends {Component}
 */
class GameBoard extends Component {
  onSquareHover = squareData => {
    if (!this.props.onSquareHover) {
      return;
    }

    this.props.onSquareHover(squareData);
  };

  onSquareClick = squareData => {
    if (!this.props.onSquareClick) {
      return;
    }

    this.props.onSquareClick(squareData);
  };

  render() {
    const { gameBoard, currentPlayerId, playerBoards, opponent } = this.props;

    const board = gameBoard.map((rows, i) => {
      return (
        <tr key={"row_" + i}>
          {rows.map(id => {
            return (
              <Square
                opponent={opponent}
                onSquareHover={this.onSquareHover}
                onSquareClick={this.onSquareClick}
                data={playerBoards[currentPlayerId][id]}
                key={id}
              />
            );
          })}
        </tr>
      );
    });

    return (
      <div className="GameBoard">
        <table>
          <tbody>{board}</tbody>
        </table>
      </div>
    );
  }
}

export default GameBoard;
