import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        "game": {
            "numberOfPlayers": -1,
            "currentPlayerID": -1,
            "currentStateID": -1, // -1 - nem kezdodott 0- betolt 1- csempehuzas 2-lerakom 3-ellorzes(átsiklik,pontok,vége)
            "players": [],
            "cards": [],
            // 10-kimarad, 11-sorrendváltozás, 12-+2
            //black: 1-sima. 2-+2, 3-+4
        },
        synced: false,
        clients: [],

    });
}

export function createCards() {

    for (let db = 0; db < 3; db++) {
        for (let id = 1; id <= 12; id++) {
            state.game.cards.push(["red", id], ["blue", id], ["green", id], ["yellow", id]);
        }

        for (let id = 1; id <= 5; id++) {
            state.game.cards.push(["black", id]);
        }
    }

    state.game.cards.sort(() => Math.random() - 0.5);
}


export function addClient(clientId) {
    state.clients.push({ id: clientId, nickname: "" });
}
export function setSynced() {
    state.synced = true;
}
export const NewGame = () => {
    state.game.currentStateID = 0;
}