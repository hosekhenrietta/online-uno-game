import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../../state/store";

export function Rotate() {

    return (
        <div className='Rotate'>

            <div className='textmiddlecard'>
                <div className="content">
                    <p>Rotate your phone to enjoy the game!</p>
                    <img src={require("../../assets/rotate.gif")} alt="" />
                </div>
            </div>

        </div>

    );
}
