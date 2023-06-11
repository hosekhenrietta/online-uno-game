import { useEffect, useState } from "react";
import user from "../../assets/user.png";
import drawDeckCard from "../../assets/cards/draw.png";
import "./GameTable.css";
import { createGame, state } from "../../state/store";
import { useSnapshot } from "valtio";

export default function GameTable() {
  const snapshot = useSnapshot(state);
  console.log(snapshot);

  console.log(state);
  const numberOfPlayers = state.game.players.length;
  const deltaRotation = 360 / numberOfPlayers;

  const degToRad = (deg) => (deg * Math.PI) / 180;
  const drawingDeck = {
    top: 40 + "%",
    left: 40 + "%",
    width: 8 + "%",
    height: 20 + "%",
  };
  const throwingDeck = {
    top: 40 + "%",
    left: 52 + "%",
    width: 8 + "%",
    height: 20 + "%",
  };
  const mainScreenPosition = {
    top: -20 + "%",
    left: 45 + "%",
    width: 1 + "%",
    height: 1 + "%",
  };

  // const cardHandPositions = player.hand.map((card, index) => {
  //   return {
  //     id: index,
  //     x: index * 50,
  //     y: 50,
  //     img: drawCard
  //   }
  // })

  console.log(snapshot.game.allCard);
  // const otherCardsPosition = cards.deck.map((cardId, i) => {
  //   const card = cards.cards[cardId];
  //   return {
  //     id: card.id,
  //     text: card.text,
  //     x: ((cards.hand.length - 1) / 2) * 50,
  //     y: -100,
  //     img: card.img
  //    };
  // });

  const playerPositions = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    const playerPos = calcPlayerPosition(i);
    playerPositions.push(playerPos);
    // sin alfa = y / radius --> y = radius * sin 90 - alfa
    // cos alfa = x / radius --> x = radius * cos 90 - alfa
  }

  function calcPlayerPosition(i) {
    const alfa = i * deltaRotation;
    const radius = 32.5;
    const y = radius * Math.sin(degToRad(90 - alfa));
    const x = radius * Math.cos(degToRad(90 - alfa));
    const top = 50 - y - 7.5;
    const left = 50 + x - 5;
    const width = 10;
    const height = 15;
    return { top, left, width, height };
  }

  function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  console.log(snapshot.game.players[0].hand);

  const getPlayerIndexOfCard = (card) =>
    state.game.players.indexOf(
      state.game.players.find((player) =>
        player.hand.some(
          (handCard) =>
            handCard[0] === card[0] && handCard[1] === card[1] && handCard[2] === card[2]
        )
      )
    );

  return (
    <div id="container">
      <div
        style={{
          top: drawingDeck.top,
          left: drawingDeck.left,
          width: drawingDeck.width,
          height: drawingDeck.height,
        }}
      >
        pakli1
      </div>
      <div
        style={{
          top: throwingDeck.top,
          left: throwingDeck.left,
          width: throwingDeck.width,
          height: throwingDeck.height,
        }}
      >
        pakli2
      </div>
      {playerPositions.map(({ top, left, width, height }, i) => (
        <div
          key={i}
          style={{
            top: top + "%",
            left: left + "%",
            width: width + "%",
            height: height + "%",
          }}
        >
          <img src={user} alt="user" style={{ width: "10vw", height: "10vw" }} />
          <div style={{ display: "flex" }}>
            {/* {snapshot.game.players[i].hand.map((playerHand, index) => (
              <img
                key={index}
                src={drawDeckCard}
                alt="userCard"
                style={{
                  position: "absolute",
                  paddingLeft: "0.5vw",
                  width: "10vw",
                  height: "10vw",
                }}
              />
            ))} */}
          </div>
        </div>
      ))}
      {snapshot.game.allCard.map((card, i) => (
        <div
          key={i}
          className="card"
          style={{
            top: []
              .concat(...snapshot.game.players.map((player) => player.hand))
              .some(
                (handCard) =>
                  handCard[0] === card[0] && handCard[1] === card[1] && handCard[2] === card[2]
              )
              ? playerPositions[getPlayerIndexOfCard(card)].top + "%"
              : 40 + i / 100 + "%",
            left: []
              .concat(...snapshot.game.players.map((player) => player.hand))
              .some(
                (handCard) =>
                  handCard[0] === card[0] && handCard[1] === card[1] && handCard[2] === card[2]
              )
              ? playerPositions[getPlayerIndexOfCard(card)].left + "%"
              : 40 + i / 100 + "%",
            width: 8 + "%",
            height: 20 + "%",
          }}
        >
          <img src={drawDeckCard} alt="card" style={{ width: "100%", height: "100%" }} />
        </div>
      ))}
    </div>
  );
}
