import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    console.log(gameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        console.log("Button clicked!");

        setGameBoard((prevGameBoard) => {
            const updateBoard = [
                ...prevGameBoard.map((innerArray) => [...innnerArray]),
            ];
            updateBoard[rowIndex][colIndex] = "X";
            return updateBoard;
        });
    }
    return (
        <ol id="game-board">
            {initialGameBoard.map((row, rowIndex) => (
                <li key = {rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key = {colIndex}>
                                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}