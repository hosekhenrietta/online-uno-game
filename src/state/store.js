import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        game: {
            numberOfPlayers: -1,
            currentPlayerID: -1,
            currentStateID: -1, // -1 - nem kezdodott 0- betolt,kártyakezekben 1-játékos akcióthajt létre
            players: {
                "ID": -1,
                "clientId": -1,
                "hand": []
            },
            drawingdeck: [],
            discarddeck: []
            // 10-kimarad, 11-sorrendváltozás, 12-+2
            //black: 13-sima. 14-+2, 15-+4
        },
        synced: false,
        clients: [],

    });
}

export function createGame() {
    createDrawingdeck();
    setPlayersHand();
}

export function createDrawingdeck() {

    for (let db = 0; db < 3; db++) {
        for (let id = 1; id <= 12; id++) {
            state.game.drawingdeck.push(["red", id], ["blue", id], ["green", id], ["yellow", id]);
        }

        for (let id = 13; id <= 15; id++) {
            state.game.drawingdeck.push(["black", id]);
        }
    }

    state.game.drawingdeck.sort(() => Math.random() - 0.5);
}

export function setPlayersHand() {
    for (let index = 0; index < state.game.players.length; index++) {
        drawFromDeck(8,index);
        
    }
}

export function drawFromDeck(num, playerID) {
    for (let index = 0; index < num; index++) {
        state.game.players[playerID].hand.push(state.game.drawingdeck.pop());
    }
}

export function addClient(clientId) {
    state.clients.push({ id: clientId, nickname: "" });
    console.log(clientId);
}
export function setSynced() {
    state.synced = true;
}
export const NewGame = () => {
    state.game.currentStateID = 0;
}