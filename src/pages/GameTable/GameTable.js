import { React, useRef, useState, useEffect, createRef } from "react";
import "./gametablestyle.css";
import "./gametableviewstyle.css";
import user from "../../assets/user.png";
import discardedCards from "../../assets/cards/q.png";
import DrawDeck from "./components/DrawDeck";
import { state } from "../../state/store";
import { AnimatePresence, motion } from "framer-motion";

export default function GameTable() {
  const [playersRef, setPlayersRef] = useState(
    new Array(4).fill().map((_, i) => createRef())
  );
  const [drawDeckCards, setDrawDeckCards] = useState([
    {
      id: 1,
      img: require("../../assets/cards/draw.png"),
      ref: createRef(),
    },
    {
      id: 2,
      img: require("../../assets/cards/draw.png"),
      ref: createRef(),
    },
    {
      id: 3,
      img: require("../../assets/cards/draw.png"),
      ref: createRef(),
    },
    {
      id: 4,
      img: require("../../assets/cards/draw.png"),
      ref: createRef(),
    },
  ]);
  const [newGameDrawDeckCards, setNewGameDrawDeckCards] = useState(drawDeckCards)
  const [animateTo, setAnimateTo] = useState({ x: 0, y: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const playerdivs = [];

  const handleDraw = (id, index) => {
    setAnimateTo({
      x:
        playersRef[currentPlayer].current.offsetLeft -
        drawDeckCards[index].ref.current.offsetLeft,
      y:
        playersRef[currentPlayer].current.offsetTop -
        drawDeckCards[index].ref.current.offsetTop,
    });
    setCurrentPlayer(
      currentPlayer === state.clients.length - 2 ? 0 : currentPlayer + 1
    );
    setDrawDeckCards(
      drawDeckCards.filter((drawDeckCard) => drawDeckCard.id !== id)
    );
    
  };

  useEffect(() => {
    console.log(animateTo.x, animateTo.y);
  }, [animateTo])

  const handleNewGameOnClick = () => {
    setCurrentPlayer(0);
    setDrawDeckCards(newGameDrawDeckCards)
  };

  for (let index = 1; index < state.clients.length - 1; index++) {

    const length = state.clients.length;
    const line1 = [];
    const line21 = [];
    const line22 = [];
    const line3 = [];

    if (state.clients.length - index > 0) {
      line21.push(
        <div className="player" ref={playersRef[index - 1]}>
          <img src={user} alt="" />
          {index - 1}
        </div>
      );
      index++;
    }

    if (state.clients.length - index > 0) {
      line22.push(
        <div className="player" ref={playersRef[index - 1]}>
          <img src={user} alt="" />
          {index - 1}
        </div>
      );
      index++;
    }

    if (state.clients.length - index > 0) {
      line1.push(
        <div className="player" ref={playersRef[index - 1]}>
          <img src={user} alt="" />
          {index - 1}
        </div>
      );
      index++;
    }

    if (state.clients.length - index > 0) {
      line3.push(
        <div className="player" ref={playersRef[index - 1]}>
          <img src={user} alt="" />
          {index - 1}
        </div>
      );
      index++;
    }

    playerdivs.push(
      <div className="container">
        <div className="line1">{line1}</div>

        <div className="line2">
          {line21}

          <div className="table">
            <AnimatePresence>
              {
                drawDeckCards.map((drawDeckCard, index) =>
                  <motion.div
                  key={drawDeckCard.id}
                  exit={{
                    x: animateTo.x,
                    y: animateTo.y,
                  }}
                  className="discarded-cards"
                  style={{ left: index * 10}}
                  ref={drawDeckCard.ref}
                >
                  <img
                    src={drawDeckCard.img}
                    alt=""
                    onClick={() => handleDraw(drawDeckCard.id, index)}
                  />
                  {index}
                </motion.div>)
              }
            </AnimatePresence>
          </div>
          <button onClick={() => handleNewGameOnClick()}>New game</button>

          {line22}
        </div>

        <div className="line3">{line3}</div>
      </div>
    );
  }

  return <div>{playerdivs}</div>;
}

/*

import { React, useRef, useState, useEffect, createRef } from "react";
import "./gametablestyle.css";
import "./gametableviewstyle.css";
import user from "../../assets/user.png";
import discardedCards from "../../assets/cards/q.png";
import draw from "../../assets/cards/draw.png";
import { motion } from "framer-motion";
import DrawDeck from "./components/DrawDeck";

export default function GameTable() {
const playerRef = useRef();
const [playerOneRef, setPlayerOneRef] = useState(new Array(4).fill().map((_, i) => createRef()));
const [isAnimating, setIsAnimating] = useState(false);

const [playerX, setPlayerX] = useState();
const [playerY, setPlayerY] = useState();
const [players, setPlayers] = useState(
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 }
)

// This function calculate X and Y
const getPosition = () => {
  setPlayerX(playerOneRef[3].current.offsetLeft);
  setPlayerY(playerOneRef[3].current.offsetTop);
  console.log(playerOneRef);
  setPlayers([
    {
      x: playerOneRef[0].current.offsetLeft,
      y: playerOneRef[0].current.offsetTop
    },
    {
      x: playerOneRef[1].current.offsetLeft,
      y: playerOneRef[1].current.offsetTop
    },
    {
      x: playerOneRef[2].current.offsetLeft,
      y: playerOneRef[2].current.offsetTop
    },
    {
      x: playerOneRef[3].current.offsetLeft,
      y: playerOneRef[3].current.offsetTop + 100
    },
  ])
};

useEffect(() => {
  console.log(players);
}, [players])

// Get the position of the red box in the beginning
useEffect(() => {
  getPosition();
}, []);

// Re-calculate X and Y of the red box when the window is resized by the user
useEffect(() => {
  window.addEventListener("resize", getPosition);
}, []);

const playerdivs = [];

for (let index = 0; index < players.length; index++) {
  console.log("alma "+players[index]);
  
}

return (
  <div className="container">

    <div className="line1">
      <div className="player">
        <img src={user} alt="" ref={playerOneRef[0]} />
      </div>
    </div>

    <div className="line2">
      <div className="player">
        <img src={user} alt="" ref={playerOneRef[1]} />
      </div>
      <div className="table">
        <div className="discarded-cards">
          <img src={discardedCards} alt="" />
        </div>
        <DrawDeck playerX={playerX} playerY={playerY} playersLocation={players} />
      </div>
      <div className="player">
        <img src={user} alt="" ref={playerOneRef[2]} />
      </div>
    </div>

    <div className="line3">
      <div className="player">
        <img src={user} alt="" ref={playerOneRef[3]} />
      </div>
    </div>
  </div>
    
);}


*/
