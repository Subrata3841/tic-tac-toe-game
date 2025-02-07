import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";

function App() {
  console.log("APP COMPONENT RENDERED");

  return (
    <main>
    <div id="game-container">
      <ol id="players">
        <Player name="Player 1" symbol="X"/>
        <Player name="Player 2" symbol="O"/>
      </ol>
      <GameBoard/>
    </div>
    LOG
    </main>
  );
}

export default App;