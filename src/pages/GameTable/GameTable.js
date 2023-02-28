import { React, useRef, useState, useEffect, createRef } from "react";
import "./gametablestyle.css";
import "./gametableviewstyle.css";
import user from "../../assets/user.png";
import discardedCards from "../../assets/cards/q.png";
import drawDeckCard from "../../assets/cards/draw.png"
import DrawDeck from "./components/DrawDeck";
import { state } from "../../state/store";
import { animate, AnimatePresence, motion } from "framer-motion";

export default function GameTable() {
  const [playersRef, setPlayersRef] = useState(
    new Array(2).fill().map((_, i) => createRef())
  );
  const [drawCardRef, setDrawCardRef] = useState([createRef()])
  const [drawCard, setDrawCard] = useState({ x: 0, y: 0})
  console.log(drawCardRef);
  const [drawDeckCards, setDrawDeckCards] = useState([{ id: 0, x: 0, y: 0 }])
  // [
  //   {
  //     id: 1,
  //     img: require("../../assets/cards/draw.png"),
  //     ref: createRef(),
  //   },
  //   {
  //     id: 2,
  //     img: require("../../assets/cards/draw.png"),
  //     ref: createRef(),
  //   },
  //   {
  //     id: 3,
  //     img: require("../../assets/cards/draw.png"),
  //     ref: createRef(),
  //   },
  //   {
  //     id: 4,
  //     img: require("../../assets/cards/draw.png"),
  //     ref: createRef(),
  //   },
  // ];
  const [newGameDrawDeckCards, setNewGameDrawDeckCards] =
    useState(drawDeckCards);
  const originalDrawCard = drawCard
  const [animateTo, setAnimateTo] = useState([{ x: 0, y: 0 }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    console.log(playersRef[0]);
  }, [playersRef])

  useEffect(() => {
    console.log("drawCardRef", drawCardRef)
    //setDrawCard({ x: drawCardRef.current.offsetLeft, y: drawCardRef.current.offsetTop })
    setDrawDeckCards([...drawDeckCards, { x: drawCardRef[0].current.offsetLeft, y: drawCardRef[0].current.offsetTop }])
    setAnimateTo([...animateTo, { x: 0, y: 0 }])
  }, [drawCardRef])

  const handleNewGameOnClick = () => {
    setCurrentPlayer(0);
    setDrawCard({ x: drawCardRef.current.offsetLeft, y: drawCardRef.current.offsetTop })
    setDrawDeckCards([{ id: 0, x: drawCardRef[0].current.offsetLeft, y: drawCardRef[0].current.offsetTop }])
    setAnimateTo([{ x: 0, y: 0 }])
  };

  const handleDrawOnClick = (index) => {
    console.log(currentPlayer, playersRef.length);
    console.log("playersRef",drawCardRef, index);
    console.log("Difference:",playersRef[currentPlayer].current.offsetTop - drawCardRef[index].current.offsetTop, playersRef[currentPlayer].current.offsetLeft - drawCardRef[index].current.offsetLeft);
    //setAnimateTo([...animateTo, { x: 0, y: 0}])
    setAnimateTo(animateTo.map((animate, animateIndex) => animateIndex === index ? {
       x:
         playersRef[currentPlayer].current.offsetLeft - drawCardRef[index].current.offsetLeft,
       y:
         playersRef[currentPlayer].current.offsetTop - drawCardRef[index].current.offsetTop,
    } : { x: animate.x, y: animate.y}));
    //setDrawCard({ x: drawCard.x - animateTo.x, y: drawCard.x - animateTo.y })
    setDrawDeckCards([...drawDeckCards, { id: drawDeckCards.length, x: drawCardRef[0].current.offsetLeft, y: drawCardRef[0].current.offsetTop }])
    setDrawCardRef([...drawCardRef, createRef()])
    setCurrentPlayer(currentPlayer + 1 < playersRef.length ? currentPlayer + 1 : 0)
  }

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

    // playerdivs.push(
    //   <div className="container">

    //     <div className="line1">{line1}</div>

    //     <div className="line2">
    //       {line21}

    //       <div className="table">
    //         <AnimatePresence>
    //           {
    //             drawDeckCards.map((drawDeckCard, index) =>
    //               <motion.div
    //               key={drawDeckCard.id}
    //               exit={{
    //                 x: animateTo.x,
    //                 y: animateTo.y,
    //               }}
    //               className="discarded-cards"
    //               style={{ left: index * 10}}
    //               ref={drawDeckCard.ref}
    //             >
    //               <img
    //                 src={drawDeckCard.img}
    //                 alt=""
    //                 onClick={() => handleDraw(drawDeckCard.id, index)}
    //               />
    //               {index}
    //             </motion.div>)
    //           }
    //         </AnimatePresence>
    //       </div>
    //       <button onClick={() => handleNewGameOnClick()}>New game</button>

    //       {line22}
    //     </div>

    //     <div className="line3">{line3}</div>
    //   </div>
    // );
  }

  return (
    <div className="gameTable">
      <div className="rowOne">
        
      </div>
      <div className="rowTwo">
        <div className="playerOne" ref={playersRef[0]}>
          <img src={user} alt="playerOne" className="playerImage" />
        </div>
        <AnimatePresence>
          <div className="deckTable">
              <img src={discardedCards} alt="discardedCards" className="cardImage" />
              { 
                //<motion.img src={drawDeckCard} animate={{ x: animateTo.x, y: animateTo.y }} alt="drawDeckCard" className="cardImage" ref={drawCardRef} onClick={() => handleDrawOnClick()}/> 
              }
              { // drawDeckCards
                animateTo.map((card, index) => {
                  console.log(index, animateTo[index], animateTo);
                  return <motion.img
                          //key={card.id}
                          src={drawDeckCard} 
                          animate={{ x: animateTo[index].x, y: animateTo[index].y }} 
                          alt="drawDeckCard" 
                          className="cardImage" 
                          ref={drawCardRef[index]} 
                          onClick={() => handleDrawOnClick(index)}
                        /> 
                })
               }
          </div>
        </AnimatePresence>
        <div className="playerTwo" ref={playersRef[1]}>
          <img src={user} alt="playerTwo" className="playerImage" />
        </div>
      </div>
      <div className="rowThree">
        <button onClick={() => handleNewGameOnClick()}>New game</button>
      </div>
    </div>
  );
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
