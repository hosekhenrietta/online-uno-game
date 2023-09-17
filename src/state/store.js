import { proxy } from "valtio";

export const state = proxy(undefined);

export function initStore() {
  Object.assign(state, {
    game: {
      numberOfPlayers: -1,
      currentPlayerID: -1,
      currentStateID: -1, // -1 - nem kezdodott 0- betolt,kártyakezekben 1-játékos akcióthajt végre
      players: [], //name, id, hand [], selectedCard
      drawingDeck: [],
      lastDiscardedCard: [],
      throwingDeck: [],
      // 10-kimarad, 11-sorrendváltozás, 12-+2
      //black: 13-sima. 14-+4
      plus2counter: 0,
      allCard: [],
    },
    synced: false,
    clients: [], // clientID, nickname
  });
}

export function addPlayers() {
  //   console.log("előtte");
  const length_ = state.clients.length;
  console.log("Client hossz: " + length_);
  console.log("Player hossz elotte: " + state.game.players.length);
  for (let index = 1; index < length_; index++) {
    // console.log("itt vagyok a forban: " + index);
    console.log(state.clients[index].id);
    state.game.players.push({
      id: index,
      clientId: state.clients[index].id,
      hand: [],
      selectedCard: null,
    });
  }

  state.game.currentPlayerID = 1;
  console.log("Player hossz: " + state.game.players.length);
  console.log("Jatekosok hozzáadva: ");
  state.game.players.forEach((element) => {
    console.log(element);
  });
  console.log("Jelenlegi játékos id: " + state.game.currentPlayerID);
}

export function createGame() {
  addPlayers();

  newGame();
}

export function newGame() {
  state.game.currentStateID = 0;
  state.game.throwingDeck = [];

  console.log("Új játék kezdődik");

  createdrawingDeck();

  setPlayersHand();

  state.game.lastDiscardedCard = state.game.drawingDeck.pop(); //selectRandomCardWithNumber();

  state.game.throwingDeck.push(state.game.lastDiscardedCard);

  console.log("Ez van a dobópakli tetején: ", state.game.lastDiscardedCard);
}

function selectRandomCardWithNumber() {
  let random = 0;
  do {
    random = Math.floor(Math.random() * (state.game.drawingDeck.length - 1));
    console.log(state.game.drawingDeck, random);
  } while (state.game.drawingDeck[random][1] > 9);

  return state.game.drawingDeck.splice(random, 1);
}

export function createdrawingDeck() {
  let key = 0;
  const numberedColors = ['red', 'blue', 'green', 'yellow']
  for (let db = 0; db < 3; db++) {
    for (let value = 1; value <= 12; value++) {
      for (const numberedColor of numberedColors) {
        state.game.drawingDeck.push({
          key: key++,
          color: numberedColor,
          value: value,
        });  
      }
    }

    for (let value = 13; value <= 14; value++) {
      state.game.drawingDeck.push(state.game.drawingDeck.push({
        key: key++,
        color: "black",
        value: value,
      }));
    }
  }

  console.log("Húzópakli létrehozva");

  state.game.drawingDeck.sort(() => Math.random() - 0.5);
  console.log("Húzópakli összekeverve:");
  console.log(state.game.drawingDeck);
  state.game.allCard = [...state.game.drawingDeck];
}

export function setPlayersHand() {
  for (let index = 0; index < state.game.players.length; index++) {
    drawFromDeck(8, index);
  }

  for (let i = 0; i < state.game.players.length; i++) {
    const element = state.game.players[i];
    console.log("Ez van az " + i + ".  játékos kezében: ");
    console.log(element.hand);
  }
}

export function drawFromDeck(num, playerID) {
  const length = state.game.drawingDeck.length;

  if (length < num) {
    console.log("kevés volt a kártya, így újra kell keverni");
    for (let index = 0; index < length; index++) {
      state.game.players[playerID].hand.push(state.game.drawingDeck.pop());
    }

    state.game.drawingDeck = [];

    createdrawingDeck();

    for (let index = 0; index < num - length; index++) {
      state.game.players[playerID].hand.push(state.game.drawingDeck.pop());
    }
  } else {
    for (let index = 0; index < num; index++) {
      state.game.players[playerID].hand.push(state.game.drawingDeck.pop());
    }
    console.log(playerID + ". játékos húzott " + num + " lapot");
  }
}

export function discard(playerID, cardIndex) {
  console.log(playerID, cardIndex);
  console.log("ezek vannak a kezében mielőtt eldobja: ");
  console.log(state.game.players[playerID].hand);

  if (
    canDiscard(
      state.game.players[playerID].hand[cardIndex].color,
      state.game.players[playerID].hand[cardIndex].value
    )
  ) {
    state.game.players[playerID].selectedCard = null;
    state.game.lastDiscardedCard = state.game.players[playerID].hand[cardIndex]

    console.log(
      "Kártya eldobva: ", JSON.stringify(state.game.players[playerID].hand[cardIndex])
    );

    //const deletedCard = state.game.players[playerID].hand.splice(cardIndex, 1)[0];
    //console.log("Ez lett törölve: ", deletedCard);
    const deletedCard = state.game.players[playerID].hand[cardIndex];
    state.game.throwingDeck.push(deletedCard);
    state.game.players[playerID].hand = state.game.players[playerID].hand.filter(
      (card, index) => cardIndex !== index
    );
    console.log("Dobó pakli erre frissült: ", JSON.stringify(state.game.throwingDeck));
  }
  console.log("ezek vannak a kezében dobás után: ");
  console.log(JSON.stringify(state.game.players[playerID].hand));
}

export function canDiscard(cardcolor, cardnumber) {
  console.log(
    "Megnézzük, hogy a kiválasztott kártya letehető-e",
    state.game.lastDiscardedCard.length == 0,
    state.game.lastDiscardedCard.color == cardcolor,
    state.game.lastDiscardedCard.value == cardnumber,
    state.game.lastDiscardedCard
  );

  return (
    state.game.lastDiscardedCard.length == 0 ||
    state.game.lastDiscardedCard.color == cardcolor ||
    state.game.lastDiscardedCard.value == cardnumber
  );
}

export function setPlayerSelectedCard(playerID, cardIndex) {
  state.game.players[playerID].selectedCard = state.game.players[playerID].hand[cardIndex];
}

export function addClient(clientId) {
  state.clients.push({ id: clientId, nickname: "" });
}

export function nextPlayer() {
  var size = state.game.players.length;
  console.log("eddig a currentplyer: " + state.game.currentPlayerID);

  if (size - 1 == state.game.currentPlayerID) {
    state.game.currentPlayerID = 0;
  } else {
    state.game.currentPlayerID++;
  }
  console.log("most a currentplyer: " + state.game.currentPlayerID);
}

export function getCardPicture(color, id) {
  return "./src/assets/cards/" + color + id + ".png";
}

export function setSynced() {
  state.synced = true;
}
