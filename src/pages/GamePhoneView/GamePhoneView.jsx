import React, { useEffect, useRef, useState } from "react";
import "./GamePhoneView.css";
import drawCard from "../../assets/cards/draw.png";
import { drawFromDeck, nextPlayer, setPlayersHand, state, setPlayerSelectedCard, discard, getCardPicture } from "../../state/store";
import { useSnapshot } from "valtio";

export default function GamePhoneView({ room, clientId }) {
  const snapshot = useSnapshot(state)
  
  const player = snapshot.game.players.find(player => player.clientId == clientId)
  const playerIndex = snapshot.game.players.indexOf(player)
  const cardHandPositions = player.hand.map((card, index) => {
    return {
      id: index,
      card: card,
      x: index * 50,
      y: 50,
      img: drawCard
    } 
  })

  const otherCardsPositions = snapshot.game.drawingDeck.map((card, index) => {
    return {
      id: index,
      card: card,
      x: ((player.hand.length - 1) / 2) * 50,
      y: -100,
      img: drawCard
    }
  })

  const cardPositions = cardHandPositions.concat(otherCardsPositions).map((card, index) => {
    card.id = index

    return card
  })

  // cardPositions.sort((a, b) => {
  //   if (a.id < b.id) return -1;
  //   return 1;
  // });

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

    console.log(snapshot.game.players[playerIndex].selectedCard, snapshot.game.players[playerIndex].hand[cardId]);
    if(JSON.stringify(snapshot.game.players[playerIndex].selectedCard) === JSON.stringify(snapshot.game.players[playerIndex].hand[cardId])) {
      console.log("Ez a selected", snapshot.game.players[playerIndex].selectedCard, snapshot.game.players[playerIndex].hand[cardId], playerIndex, cardId)
      discard(playerIndex, cardId)
    }
    else
      setPlayerSelectedCard(playerIndex, cardId)
  };

  console.log(snapshot.game.players[playerIndex].selectedCard);

  return (
    <div id="container">
      <div className="messagediv">
         <h3>
           Choose a card and swipe up OR draw a card by pushing the button!
         </h3>
      </div>
      
        {cardPositions.map(({ id, text, x, y, img, card, index }) => (
          <div
            key={id}
            className="card"
            style={{
              top: !!snapshot.game.players[playerIndex].selectedCard && JSON.stringify(snapshot.game.players[playerIndex].selectedCard) === JSON.stringify(card) ? '40%' : `${y}%`,
              left: `${x}px`,
              width: "8%",
              height: "20%"
            }}
            onClick={(e) => handleSelect(id)}
          >
            <img
              src={getCardPicture(card[0], card[1])}
              alt="card"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      <div className="buttons">
        <button onClick={handleDraw}> Draw from deck</button>
      </div>
    </div>
  );
}
