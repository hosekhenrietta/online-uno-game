import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../../state/store";

export function WaitingRoomOnPhone({ room, host, clientId, nickname, clients, NewGameEvent, setGameIsStartedEvent, setNicknameEvent, setNameIsCreatedEvent }) {

    return (
        <div className='WaitingRoom'>
            {
                (clients.length === 0 && clientId !== null) ?
                    <div className='wrong'>
                        <p> Something went wrong :( Please create or join a new room! </p>
                        <button className="saveNameButton copyButton" onClick={() => { window.location.reload() }} ><span>Try again</span></button>
                    </div> :
                    <div>

<span className='roomcode'>{room}</span>
                        <div className='WaitingRoomCards'>
                        
                            
                            <div className='textmiddlecard'>
                                <div className="content">
                                    
                                    Set your nickname so they know who you are! </div>
                                <div className='flex'>
                                    <input placeholder={"Set your nickname here"} onChange={(e) => { setNicknameEvent(e.target.value) }} />
                                    
                                    <button className="saveNameButton" onClick={() => { ( nickname.length ==0 || nickname == null)? window.alert("The input cannot be empty"):clients.filter(el => el.id === clientId)[0].nickname = nickname; setNameIsCreatedEvent(true) }}><span className='text'>Save name</span></button>
                                </div>
                            </div>

                        </div>
                     
                    </div>

            }
        </div>

    );
}
