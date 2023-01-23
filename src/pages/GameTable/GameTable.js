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
  const [playerOneRef, setPlayerOneRef]  = useState(new Array(4).fill().map((_, i) => createRef()));
  const [isAnimating, setIsAnimating] = useState(false);

  const [playerX, setPlayerX] = useState();
  const [playerY, setPlayerY] = useState();
  const [players, setPlayers] = useState(
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0}
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

  return (
    <div className="container">
      <div className="line1">
        <div className="player">
          <img src={user} alt="" ref={playerOneRef[0]}/>
        </div>
      </div>

      <div className="line2">
        <div className="player">
          <img src={user} alt="" ref={playerOneRef[1]}/>
        </div>
        <div className="table">
          <div className="discarded-cards">
            <img src={discardedCards} alt="" />
          </div>
          <DrawDeck playerX={playerX} playerY={playerY} playersLocation={players}/>
        </div>
        <div className="player">
          <img src={user} alt="" ref={playerOneRef[2]}/>
        </div>
      </div>

      <div className="line3">
        <div className="player">
          <img src={user} alt="" ref={playerOneRef[3]} />
        </div>
      </div>
    </div>
import React from "react";

export function GameTable() {

  return (
    <div className="GameTable">
    <body>   

        <div class="container">

            <div class="line1"> 
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">

                </div>
            </div>

            <div class="line2">
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div> 
                <div class="table">
                    <div class="discarded-cards">
                        <img src="../../assets/cards/q.png" alt="">
                    </div>
                    <div class="deck">
                        <img src="../../assets/cards/draw.png" alt="">
                    </div>
                </div>
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div> 

            </div>


            <div class="line3">
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div>    
            </div>


        </div>

    </body>
</html>
    </div>
  );
}
