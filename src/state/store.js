import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        "game": {
            "numberOfPlayers": -1,
            "currentPlayerID": -1,
            "currentStateID": -1, // -1 - nem kezdodott 0- betolt 1- csempehuzas 2-lerakom 3-ellorzes(átsiklik,pontok,vége)
            "players": [],
            "cards": [
                ["red",1],["red",2],["red",3],["red",4],["red",5],["red",6],["red",7],["red",8],["red",9],["red",10],["red",11],["red",12],
                ["red",1],["red",2],["red",3],["red",4],["red",5],["red",6],["red",7],["red",8],["red",9],["red",10],["red",11],["red",12],
                ["red",1],["red",2],["red",3],["red",4],["red",5],["red",6],["red",7],["red",8],["red",9],["red",10],["red",11],["red",12],
                ["red",1],["red",2],["red",3],["red",4],["red",5],["red",6],["red",7],["red",8],["red",9],["red",10],["red",11],["red",12],
                ["black",1],["black",2],["black",3],["red",4],["red",5]
            ],
            // 10-kimarad, 11-sorrendváltozás, 12-+2
        },
        synced: false,
        clients: [],

    });
}

export function createCards() {
    for (let index = 0; index < 4; index++) {
        if (index = 0) {
           // color_="red"
        }
       // state.clients.push({ color: color_, number: "" }); 
    }
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