import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../../state/store";

export function WaitingRoom({ room, host, clientId, nickname, clients, NewGameEvent, setGameIsStartedEvent, setNicknameEvent, setNameIsCreatedEvent }) {

    const snap = useSnapshot(state)
    return (
        <div className='WaitingRoom'>
            {
                (clients.length === 0 && clientId !== null) ?
                    <div className='wrong'>
                        <p> Something went wrong :( Please create or join a new room! </p>
                        <button className="saveNameButton copyButton" onClick={() => { window.location.reload() }} ><span>Try again</span></button>
                    </div> :
                    <div>

                        <div className='WaitingRoomCards'>
                            
                            <div className='textmiddlecard'>
                                <div className="content">
                                    {clients.length} people have already joined the room! <br />
                                    Set your nickname so they know who you are! </div>
                                <div className='flex'>
                                    <input placeholder={"Set your nickname here"} onChange={(e) => { setNicknameEvent(e.target.value) }} />
                                    
                                    <button className="saveNameButton" onClick={() => { ( nickname.length ==0 || nickname == null)? window.alert("The input cannot be empty"):clients.filter(el => el.id === clientId)[0].nickname = nickname; setNameIsCreatedEvent(true) }}><span className='text'>Save name</span></button>
                                </div>
                            </div>
                            <div className='textmiddlecard'>
                                <div className="content">
                                    If you want more people to join, send them this code: <span className='roomcode'>{room}</span>
                                    <br /> Or copy it by clicking the button:
                                </div>
                                <button className="saveNameButton copyButton" onClick={() => { navigator.clipboard.writeText(room) }} ><span>copy the room</span></button>
                            </div>
                        </div>
                        <div className='textmiddlecard'>
                            <div className="content">
                                <p>They are already waiting: </p>
                                <div className="playerlist">
                                    {
                                        clients.map((el,i) => <div key={i}>{el.nickname}</div>)
                                    }
                                </div>
                                {
                                    (host) ?
                                        <button className="newGameButton copyButton" onClick={() => {
                                            if( clients.length < 2 || clients.length > 6) { window.alert("Only 2 - 6 gamer can play this game")}
                                            else{
                                            state.game.numberOfPlayers = clients.length
                                            NewGameEvent(); setGameIsStartedEvent(true)
                                            }
                                        }}>
                                            <span>start game</span>
                                        </button>
                                        :
                                        <span className="roomcode"> Waiting for the host to start the game </span>

                                }
                            </div>
                        </div>
                    </div>

            }
        </div>

    );
}
