import React from "react";

export function GameTable() {

  return (
    <div className="GameTable">
    <body>   

        <div class="container">

            <div class="line1"> 
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">

                </div>
            </div>

            <div class="line2">
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div> 
                <div class="table">
                    <div class="discarded-cards">
                        <img src="../../assets/cards/q.png" alt="">
                    </div>
                    <div class="deck">
                        <img src="../../assets/cards/draw.png" alt="">
                    </div>
                </div>
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div> 

            </div>


            <div class="line3">
                <div class="player"> 
                    <img src="../../assets/user.png" alt="">
                </div>    
            </div>


        </div>

    </body>
</html>
    </div>

  );
}
