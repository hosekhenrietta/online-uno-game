import React from "react";

export function JoinRoomOnPhone({ room, createRoomEvent, handleJoinRoom, setRoomEvent }) {

  return (
    <div className="RoomMaker">

<div className="textmiddlecard">
      <p> If you would like to play, open it in a browser with a computer and create a room.</p>
      <p> If you already have a connection code, you can enter it here to join the game.</p>
      <input type="text" onChange={(e) => setRoomEvent(e.target.value)} />

      <div className='ButtonDiv'>
        <button onClick={() => (room.length == 0 || room == null) ? window.alert("The input cannot be empty") : handleJoinRoom()} className="roomButton" role="button"><span className="text">Join Existing Room</span></button>
      </div>
</div>
    </div>

  );
}
