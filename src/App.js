import React from 'react';
import { useEffect, useState } from 'react'
import './App.css';
import Animations from './pages/Animations/Animations';
import GameTable from './pages/GameTable/GameTable';

import { proxy, useSnapshot } from 'valtio'
import * as Y from "yjs";
import { bind } from "valtio-yjs";
import { WebsocketProvider } from "y-websocket";
import { state, addClient, initStore, NewGame } from "./state/store";
import { nanoid } from "nanoid";
import { RoomMaker } from './pages/RoomMaker/RoomMaker';
import { WaitingRoom } from './pages/WaitingRoom/WaitingRoom';
import GamePhone from './pages/GamePhoneView/GamePhone';

const waitForSync = (websocketProvider) =>
  new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject("timeout"), 5000);
    websocketProvider.on("sync", (isSynced) => {
      if (isSynced) {
        clearTimeout(timerId);
        resolve();
      }
    });
  });
const createSyncedStore = async (room, state) => {
  try {
    const ydoc = new Y.Doc();
    const websocketProvider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      room,
      ydoc
    );
    await waitForSync(websocketProvider);
    const yStore = ydoc.getMap("store");
    bind(state, yStore);
    return { clientId: ydoc.clientID };
  } catch (e) {
    console.error(e);
  }
};

function App() {

  const [room, setRoom] = useState(nanoid(10));
  const [host, setHost] = useState(false);
  const [clientId, setClientId] = useState(null);


  const [roomIsCreated, setRoomISCreated] = useState(false)
  const [gameIsStarted, setGameIsStarted] = useState(false)
  const [nameIsCreated, setNameIsCreated] = useState(false)
  const [nickname, setNickname] = useState("")


  const snap = useSnapshot(state)
  const synced = snap.synced


  const isEmptySnapshot = Object.keys(snap).length === 0
  const handleCreate = async () => {
    let result = await createSyncedStore(room, state)
    const clientId = result.clientId
    console.log(state.clients);

    if (state.clients === undefined) {
      setRoomISCreated(true)
      setClientId(clientId);
      initStore()
      addClient(clientId)
      setHost(true)
    }
    else {
      alert("This room is already created! Change the name to an unused roomname or try to join to the prevoius.")
    }
  };

  const handleJoin = async () => {
    let result = await createSyncedStore(room, state)
    const clientId = result.clientId;
    if (state.clients !== undefined) {
      setClientId(clientId);
      setRoomISCreated(true)
      addClient(clientId);
    }
    else {
      alert("This room is not created yet! If you click on CREATE NEW ROOM you will create it.")
    }


  };



  useEffect(() => {
    if (clientId && synced) {
      addClient(clientId);
    }
  }, [synced, clientId]);



  const handleSetRoomEvent = (e) => { setRoom(e) }
  const handleSetGameISStartedEvent = (e) => { setGameIsStarted(e) }
  const handleNewGameEvent = () => { NewGame()}
  const handlesetNicknameEvent = (e) => { setNickname(e) }
  const handlesetNameIsCreatedEvent = (e) => { setNameIsCreated(e) }



  return (
    <div className="App">
      <GamePhone />
    </div>  
  );
}

export default App;
