import { proxy } from "valtio"

export const state = proxy(undefined);

export function initStore() {
    Object.assign(state, {
        "game": 0,
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