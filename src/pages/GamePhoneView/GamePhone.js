import React from 'react'

export default function GamePhone() {
  return (
    <div class="container">
	    <div class="messagediv">
	        <h3>Choose a card and swipe up OR draw a card by pushing the button!</h3>
        </div>
	
        <div class="heand">
            <div class="card">
                <img src="../../assets/cards/q.png" />
            </div>
            <div class="card">
                <img src="../../assets/cards/q.png" />
            </div>
            <div class="choosen-card">
                <img src="../../assets/cards/q.png" />
            </div>
            <div class="card">
                <img src="../../assets/cards/q.png" />
            </div>
        </div>

        <div class="buttons">
            <button> Draw from deck</button>
        </div>
    </div>
  )
}
