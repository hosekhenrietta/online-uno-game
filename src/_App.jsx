import { useState } from "react";

// const state = {
//   // ....
//   animationState: null / {
//     obj: id / "card1", --> from, "player1" --> x, y
//     to: "deck" --> x, y
//   }
// }

function App() {
  const [cards, setCards] = useState({
    cards: {
      1: { id: "1", text: 1 },
      2: { id: "2", text: 2 },
      3: { id: "3", text: 3 },
      4: { id: "4", text: 4 },
      5: { id: "5", text: 5 },
      6: { id: "6", text: 6 },
      7: { id: "7", text: 7 },
      8: { id: "8", text: 8 },
      9: { id: "9", text: 9 },
    },
    deck: ["3", "4", "5", "6", "7", "8", "9"],
    hand: ["1", "2"],
    selectedCard: null,
  });
  console.log(cards);

  // Calculated or computed values
  // const clientWidth = document.style.clientWidth;
  // console.log(clientWidth);
  const cardHandPositions = cards.hand.sort().map((cardId, i) => {
    const card = cards.cards[cardId];
    return {
      id: card.id,
      text: card.text,
      x: i * 50,
      y: 50 + (cards.selectedCard === cardId ? -20 : 0),
    };
  });
  const otherCardsPosition = cards.deck.map((cardId, i) => {
    const card = cards.cards[cardId];
    return {
      id: card.id,
      text: card.text,
      x: 0,
      y: -70,
    };
  });
  const cardPositions = cardHandPositions.concat(otherCardsPosition);

  cardPositions.sort((a, b) => {
    if (a.id < b.id) return -1;
    return 1;
  });
  console.log(cardPositions);

  // Event handlers
  const handleDraw = (e) => {
    const newCards = structuredClone(cards);
    newCards.hand.push(newCards.deck.shift());
    setCards(newCards);
  };
  const handleSelect = (cardId) => {
    const newCards = structuredClone(cards);
    console.log(newCards.selectedCard, cardId);
    if (newCards.selectedCard === cardId) {
      // dobás
      console.log("throw");
      newCards.deck.push(cardId);
      newCards.hand = newCards.hand.filter((c) => c !== cardId);
    } else {
      // jelölés
      newCards.selectedCard = cardId;
    }
    setCards(newCards);
  };

  // const handleClick = e => {
  //   setCard({ ...card, x: 500, y: 300 })
  // }
  // const handleTransitionEnd = e => {
  //   setCard(({...card, visible: !card.visible}))
  // }

  return (
    // <div hidden={!card.visible} onTransitionEnd={handleTransitionEnd} onClick={handleClick} style={{transition: "all 1s", border: "1px solid black", position: "absolute", top: card.y, left: card.x}}>
    //   kártya
    // </div>
    <div style={{ position: "relative" }}>
      <button onClick={handleDraw}>Draw a card</button>
      <div>
        {cardPositions.map(({ id, text, x, y }) => (
          <div
            key={id}
            style={{
              position: "absolute",
              border: "1px solid black",
              width: "40px",
              height: "30px",
              top: `${y}px`,
              left: `${x}px`,
              transition: "all 0.5s",
            }}
            onClick={(e) => handleSelect(id)}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
