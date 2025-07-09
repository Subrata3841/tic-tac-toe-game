import { useState } from "react";

import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import GameOver from "./assets/components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combination.js";

const initialGameBoard =  [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]); // row,col, playerSymbol
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

 // let gameBoard = initialGameBoard;   //!  Wrong, gameBoard directly references initialGameBoard
 const gameBoard = initialGameBoard.map(row => [...row]); //* Creates a fresh copy


  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSqareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSquareSymbol &&
      firstSqaureSymbol === thirdSqareSymbol
    ) {
      winner = firstSqaureSymbol;
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curAtivePlayer) => (curAtivePlayer === "X" ? "O" : "X"));
    if (gameBoard[rowIndex][colIndex] || winner) return; // Prevent selecting a filled square
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurn;
    });
  }

  function handleRematch() {
    setGameTurns([]); //* Reset the game state
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) ? <GameOver winner={winner} onRematch={handleRematch}/> : null}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} style={{ display: "none" }} /> {/* LOG-> is used for show the moves */}
    </main>
  );
}

export default App;