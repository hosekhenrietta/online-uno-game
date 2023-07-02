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
      allCard: []
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
    state.game.players.push({ id: index, clientId: state.clients[index].id, hand: [], selectedCard: null });
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
  state.game.throwingDeck = []

  console.log("Új játék kezdődik");

  createdrawingDeck();

  setPlayersHand();

  state.game.lastDiscardedCard = state.game.drawingDeck.pop();

  state.game.throwingDeck.push(state.game.lastDiscardedCard)

  console.log("Ez van a dobópakli tetején: ", state.game.lastDiscardedCard);
}

export function createdrawingDeck() {
  let key = 0;
  for (let db = 0; db < 3; db++) {
    for (let id = 1; id <= 12; id++) {
      state.game.drawingDeck.push(["red", id, key]);
      key++;
      state.game.drawingDeck.push(["blue", id, key]);
      key++;
      state.game.drawingDeck.push(["green", id, key]);
      key++;
      state.game.drawingDeck.push(["yellow", id, key]);
      key++;
    }

    for (let id = 13; id <= 14; id++) {
      state.game.drawingDeck.push(["black", id, key]);
      key++;
    }
  }

  console.log("Húzópakli létrehozva");

  state.game.drawingDeck.sort(() => Math.random() - 0.5);
  console.log("Húzópakli összekeverve:");
  console.log(state.game.drawingDeck);
  state.game.allCard = [...state.game.drawingDeck]
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
  var length = state.game.drawingDeck.length;

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
      state.game.players[playerID].hand[cardIndex][0],
      state.game.players[playerID].hand[cardIndex][1]
    )
  ) {
    state.game.players[playerID].selectedCard = null
    state.game.lastDiscardedCard = [
      state.game.players[playerID].hand[cardIndex][0],
      state.game.players[playerID].hand[cardIndex][1],
    ];
    console.log(
      "Kártya eldobva: " +
        state.game.players[playerID].hand[cardIndex][0] +
        " " +
        state.game.players[playerID].hand[cardIndex][1]
    );
    
    state.game.throwingDeck.push(state.game.players[playerID].hand[cardIndex])
    state.game.players[playerID].hand.splice(cardIndex, 1);
  }
  console.log("ezek vannak a kezében dobás után: ");
  console.log(state.game.players[playerID].hand);
}

export function canDiscard(cardcolor, cardnumber) {
  console.log("Megnézzük, hogy a kiválasztott kártya letehető-e");
  return (
    state.game.lastDiscardedCard.length == 0 ||
    state.game.lastDiscardedCard[0] == cardcolor ||
    state.game.lastDiscardedCard[1] == cardnumber
  );
}

export function setPlayerSelectedCard(playerID, cardIndex) {
  state.game.players[playerID].selectedCard = state.game.players[playerID].hand[cardIndex]
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
