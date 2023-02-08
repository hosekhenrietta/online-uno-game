import React from "react";

export function RoomMaker({ room, createRoomEvent, handleJoinRoom, setRoomEvent }) {

  return (
    <div className="RoomMaker">

      <p> If you would like to play create a room here, and join on your phone.</p>

      <input type="text" value={room} onChange={(e) => setRoomEvent(e.target.value)} />

      <div className='ButtonDiv'>
        <button onClick={() => (room.length == 0 || room == null) ? window.alert("The input cannot be empty") : createRoomEvent()} className="roomButton" role="button"><span className="text">Create new Room</span></button>
        </div>

    </div>

  );
}
