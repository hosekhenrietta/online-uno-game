import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        game: {
            numberOfPlayers: -1,
            currentPlayerID: -1,
            currentStateID: -1, // -1 - nem kezdodott 0- betolt,kártyakezekben 1-játékos akcióthajt végre
            players: [], //name, id, hand []
            drawingDeck: [],
            lastDiscardedCard: [],
            // 10-kimarad, 11-sorrendváltozás, 12-+2
            //black: 13-sima. 14-+4
            plus2counter: 0
        },
        synced: false,
        clients: [], // clientID, nickname

    });
}
export function createGame() {
    addPlayers()
}
export function NewGame() {
    state.game.currentStateID = 0;
    createdrawingDeck();
    setPlayersHand();
}
export function createdrawingDeck() {

    for (let db = 0; db < 3; db++) {
        for (let id = 1; id <= 12; id++) {
            state.game.drawingDeck.push(["red", id], ["blue", id], ["green", id], ["yellow", id]);
        }

        for (let id = 13; id <= 14; id++) {
            state.game.drawingDeck.push(["black", id]);
        }
    }

    state.game.drawingDeck.sort(() => Math.random() - 0.5);
}
export function setPlayersHand() {
    for (let index = 0; index < state.game.players.length; index++) {
        drawFromDeck(8,index);
        
    }
}
export function drawFromDeck(num, playerID) {
    for (let index = 0; index < num; index++) {
        state.game.players[playerID].hand.push(state.game.drawingDeck.pop());
    }
}
export function addPlayers() {
   for (let index = 0; index < state.game.clients.length; index++) {
    state.players.push({ id: index, clientId: state.game.clients[index].clientId, hand: [] }); 
   }
}
export function discard( playerID, cardID){

    if (canDiscard(state.game.players[playerID].hand[cardID][0],state.game.players[playerID].hand[cardID][1])) {
        state.game.lastDiscardedCard = [state.game.players[playerID].hand[cardID][0],state.game.players[playerID].hand[cardID][1]]
        state.game.players[playerID].hand[cardID].splice(cardID,cardID);
    }
}
export function canDiscard(cardcolor, cardnumber){    
    return ((state.game.lastDiscardedCard[0] == cardcolor) || (state.game.lastDiscardedCard[1] == cardnumber));
}
export function addClient(clientId) {
    state.clients.push({ id: clientId, nickname: "" });
}
export function setSynced() {
    state.synced = true;
}