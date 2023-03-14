import React, { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(GenerateNewDice);
  const [tenzies, setTenzies] = useState(false);

  function getNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6),
      isHeld: false,
    };
  }

  function GenerateNewDice() {
    const tempDice = [];
    for (let i = 0; i < 10; ++i) {
      tempDice.push(getNewDie());
    }
    return tempDice;
  }

  function rollDice() {
    if (tenzies) window.location.reload();
    else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : getNewDie();
        })
      );
    }
  }

  useEffect(() => {
    let i = 0,
      dieVal = dice[0].value;
    for (; i < dice.length; ++i) {
      if (!dice[i].isHeld || dice[i].value !== dieVal) break;
    }
    if (i === dice.length) {
      setTenzies(true);
    }
  }, [dice]);

  /***NOTE***/
  /*** in setState() we do not have to write 'return' because it is already designed for returning the new state of the element ****/
  /****** in map() mathod, we have to write 'return' because it returns the new array/object ******/

  function isHold(boxId) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === boxId ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const allDice = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      dieId={die.id}
      isHeld={die.isHeld}
      onHold={isHold}
    />
  ));

  return (
    <main className="dom">
      {tenzies && <Confetti />}
      <div className="container">
        <h3>Tenzies Game</h3>
        <div className="infoBox">
          <p>
            Roll the dice to change the values. Click on a die to freez it. Make
            all dice same to win the game
          </p>
        </div>
        <div className="dieContainer">
          <div className="dieBox">{allDice}</div>
          <button className="generate-btn" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll Dice"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
