import React, { useEffect, useRef, useState } from "react";
import DrawDeckCard from "./DrawDeckCard";
import { motion } from "framer-motion";
import draw from "../../../assets/cards/draw.png";

export default function DrawDeck({playerX, playerY, playersLocation}) {
  const [drawDeck, setDrawDeck] = useState(new Array(32).fill(0));
  const [isAnimating, setIsAnimating] = useState(new Array(32).fill(false));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const {innerWidth, innerHeight} = window;
  const [distance, setDistance] = useState({x: 0, y: 0})
  const drawRef = useRef()
  const players = [
    {
      x: 300,
      y: 0,
    },
    {
      x: 0,
      y: -300,
    },
    {
      x: -300,
      y: 0,
    },
    {
      x: 0,
      y: 300,
    },
  ];

  const [drawX, setDrawX] = useState();
  const [drawY, setDrawY] = useState();

  // This function calculate X and Y
  const getPosition = () => {
    setDrawX(drawRef.current.offsetLeft);
    setDrawY(drawRef.current.offsetTop);
  };

  // Get the position of the red box in the beginning
  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    console.log("Draw",drawX, drawY);
  }, [drawX, drawY, playersLocation])

  // Re-calculate X and Y of the red box when the window is resized by the user
  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  const deckView = drawDeck.map((item, index) => {
    if (index === currentPlayer) {
      return (
        <motion.div
          className="deck"
          animate={{
            //x: 700,
            x: distance.x,
            y: distance.y,
            //opacity: isAnimating ? 1 : 0.5,
            //backgroundColor: "blue",
            //scale: 2
            //rotate: isAnimating ? 360 : 0
          }}
          initial={
            {
              //opacity: 0.2
            }
          }
          transition={{
            type: "tween",
            duration: 1
            /*type: "spring",
            stiffness: 100,
            damping: 100,*/
          }}
          ref={drawRef}
        >
          <img src={draw} alt="" />
        </motion.div>
      );
    } else {
      <div 
        className="deck"
        onClick={() => handleDrawOnClick(index)}
        ref={drawRef}
        >
        <img src={draw} alt="" />
      </div>;
    }
  });

  const handleDrawOnClick = (index) => {
    const helperIsAnimating = isAnimating.map((item, i) => {
      if (index === i) {
        return true;
      } else return item;
    });
    setIsAnimating(helperIsAnimating);
    setDistance({ x: playersLocation[currentPlayer].x - drawX, y: playersLocation[currentPlayer].y - drawY })
    currentPlayer === 3
      ? setCurrentPlayer(0)
      : setCurrentPlayer(currentPlayer + 1);
  };

  return <div>{deckView}
  <button onClick={() => handleDrawOnClick(currentPlayer)}/></div>;
}
