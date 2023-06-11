import React, { useEffect, useRef, useState } from "react";
import "./GamePhoneView.css";
import drawCard from "../../assets/cards/draw.png";
import { drawFromDeck, nextPlayer, setPlayersHand, state } from "../../state/store";
import { useSnapshot } from "valtio";

export default function GamePhoneView({ room, clientId, playerIndex }) {
  const snapshot = useSnapshot(state)
  
  const player = snapshot.game.players.find(player => player.clientId == clientId)
  const cardHandPositions = player.hand.map((card, index) => {
    return {
      id: index,
      x: index * 50,
      y: 50,
      img: drawCard
    } 
  })

  const otherCardsPositions = snapshot.game.drawingDeck.map((card, index) => {
    return {
      id: index,
      x: ((player.hand.length - 1) / 2) * 50,
      y: -100,
      img: drawCard
    }
  })

  const cardPositions = cardHandPositions.concat(otherCardsPositions);

  cardPositions.sort((a, b) => {
    if (a.id < b.id) return -1;
    return 1;
  });

  // Event handlers-
  const handleDraw = (e) => {
    console.log(clientId, snapshot.game.players[snapshot.game.currentPlayerID].clientId);
    if(clientId === snapshot.game.players[snapshot.game.currentPlayerID].clientId) {
      drawFromDeck(1, snapshot.game.players.indexOf(snapshot.game.players.find(player => player.clientId === clientId)))
      nextPlayer()
    } else {
      console.log("Current:", snapshot.game.players[snapshot.game.currentPlayerID].clientId)
    }

  };

  const handleSelect = (cardId) => {
    // const newCards = structuredClone(cards);
    // console.log(newCards.selectedCard, cardId);
    // if (newCards.selectedCard === cardId) {
    //   // dobás
    //   console.log("throw");
    //   newCards.deck.push(cardId);
    //   newCards.hand = newCards.hand.filter((c) => c !== cardId);
    // } else {
    //   // jelölés
    //   newCards.selectedCard = cardId;
    // }
    // setCards(newCards);
  };

  return (
    <div id="container">
      <div className="messagediv">
         <h3>
           Choose a card and swipe up OR draw a card by pushing the button!
         </h3>
      </div>
      
        {cardPositions.map(({ id, text, x, y, img, index }) => (
          <div
            key={index}
            className="card"
            style={{
              top: `${y}%`,
              left: `${x}px`,
              width: "8%",
              height: "20%"
            }}
            onClick={(e) => handleSelect(id)}
          >
            <img
              src={img}
              alt="card"
              style={{ width: "100%", height: "100%" }}
              onClick={(e) => handleSelect(id)}
            />
          </div>
        ))}
      <div className="buttons">
        <button onClick={handleDraw}> Draw from deck</button>
      </div>
    </div>
  );
}
