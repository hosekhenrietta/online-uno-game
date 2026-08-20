import React from "react";
import { useSnapshot } from "valtio";
import { state, setLatePlayersCanJoin, setUseRoundTimeLimit, setRoundTimeLimit } from "../../state/store";

export function WaitingRoom({
  room,
  host,
  clientId,
  nickname,
  clients,
  NewGameEvent,
  setGameIsStartedEvent,
  setNicknameEvent,
  setNameIsCreatedEvent,
}) {
  const snap = useSnapshot(state);
  return (
    <div className="WaitingRoom">
      {clients.length === 0 && clientId !== null ? (
        <div className="wrong">
          <p> Something went wrong :( Please create or join a new room! </p>
          <button
            className="saveNameButton copyButton"
            onClick={() => {
              window.location.reload();
            }}
          >
            <span>Try again</span>
          </button>
        </div>
      ) : (
        <div>
          Roomcode:{" "}
          <span
            className="roomcode"
            onClick={() => {
              navigator.clipboard.writeText(room);
            }}
          >
            {room}
          </span>
          <div className="textmiddlecard">
            <div className="content">
              <p>They are already waiting: </p>
              <div className="playerlist">
                {clients.map((el, i) => (
                  <div key={i}>{el.nickname}</div>
                ))}
              </div>
              {host ? (
                <>
                  <input
                    type="checkbox"
                    name="useRoundTimeLimit"
                    checked={snap.settings.useRoundTimeLimit}
                    onChange={(e) => setUseRoundTimeLimit(e.target.checked)}
                  />
                  <label htmlFor="useRoundTimeLimit">Időlimit hozzáadása a körökhöz</label>
                  {snap.settings.useRoundTimeLimit && (
                    <>
                      <input
                        type="number"
                        name="roundTimeLimit"
                        value={snap.settings.roundTimeLimit}
                        onChange={(e) => setRoundTimeLimit(e.target.value)}
                      />
                      <label htmlFor="roundTimeLimit">Időlimit a körökhöz</label>
                    </>
                  )}
                  <input
                    type="checkbox"
                    name=""
                    checked={snap.settings.latePlayersCanJoin}
                    onChange={(e) => setLatePlayersCanJoin(e.target.checked)}
                  />
                  <label htmlFor="latePlayersCanJoin">Játékosok utólag is tudnak csatlakozni</label>
                  <button
                    className="newGameButton copyButton"
                    onClick={() => {
                      if (clients.length < 3 || clients.length > 12) {
                        window.alert("Only 2 - 12 gamer can play this game");
                      } else {
                        //state.game.numberOfPlayers = clients.length
                        NewGameEvent();
                        //   setGameIsStartedEvent(true);
                      }
                    }}
                  >
                    <span>Start game</span>
                  </button>
                </>
              ) : (
                <span className="roomcode"> Waiting for the host to start the game </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 
                     <div className='WaitingRoomCards'>
                            
                           
                            <div className='textmiddlecard'>
                                <div className="content">
                                    If you want more people to join, send them this code: <span className='roomcode'>{room}</span>
                                    <br /> Or copy it by clicking the button:
                                </div>
                                <button className="saveNameButton copyButton" onClick={() => { navigator.clipboard.writeText(room) }} ><span>copy the room</span></button>
                            </div>
                        </div>
*/
