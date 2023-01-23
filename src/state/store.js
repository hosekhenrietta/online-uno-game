import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        "game": {
            "numberOfPlayers": -1,
            "currentPlayerID": -1,
            "currentStateID": -1, // -1 - nem kezdodott 0- betolt 1- csempehuzas 2-lerakom 3-ellorzes(átsiklik,pontok,vége)
            "players": [],
        },
        synced: false,
        clients: [],

    });
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