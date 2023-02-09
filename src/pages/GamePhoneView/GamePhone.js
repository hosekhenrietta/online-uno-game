import React, { useEffect, useRef, useState } from "react";
import "./gamephoneviewstyle.css";
import { AnimatePresence, motion } from "framer-motion";

export default function GamePhone() {
  const [coordiante, setCoordiante] = useState(0);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      img: require("../../assets/cards/bc.jpg"),
      yCoordiante: 0,
      isCardSelected: false,
    },
    {
      id: 2,
      img: require("../../assets/cards/q.png"),
      yCoordiante: 0,
      isCardSelected: false,
    },
    {
      id: 3,
      img: require("../../assets/cards/draw.png"),
      yCoordiante: 0,
      isCardSelected: false,
    },
    {
      id: 4,
      img: require("../../assets/cards/q.png"),
      yCoordiante: 0,
      isCardSelected: false,
    },
  ]);

  const handleCardOnClick = (index) => {
    let helperCards = [...cards];

    helperCards = helperCards.map((helperCard, helperIndex) =>
      index !== helperIndex
        ? {
            id: helperCard.id,
            img: helperCard.img,
            yCoordiante: 0,
            isCardSelected: false,
          }
        : helperCard
    );

    
    if (!helperCards[index].isCardSelected) {
      
      helperCards[index] = {
        id: helperCards[index].id,
        img: helperCards[index].img,
        yCoordiante: -30,
        isCardSelected: true,
      };

      setCards(helperCards);

    } else {
      setCards(cards.filter(card => !card.isCardSelected));
    }
  };

  const handleDrawCardOnClick = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        img: require("../../assets/cards/draw.png"),
        yCoordiante: 0,
        isCardSelected: false,
      },
    ]);
  };

  return (
    <div className="container">
      <div className="messagediv">
        <h3>
          Choose a card and swipe up OR draw a card by pushing the button!
        </h3>
      </div>

      <div className="heand">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              className="card"
              key={card.id}
              initial={{
                y: -300
              }}
              animate={{
                y: card.yCoordiante,
              }}
              onClick={() => handleCardOnClick(index)}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              exit={{ y: -300, opacity: 0 }}
            >
              <img alt="" src={card.img} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="buttons">
        <button onClick={handleDrawCardOnClick}> Draw from deck</button>
      </div>
    </div>
  );
}
