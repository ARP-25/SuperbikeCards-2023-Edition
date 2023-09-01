console.log("connected");


if (document.getElementById("start-game")) {
    document.getElementById("start-game").addEventListener("click", function() {
      let playerInput = document.getElementById("player-input").value;
      if (playerInput !== "") {
        window.location.href = "game.html";
      } else {
        alert("Please enter your Player Name!");
      }
    });
}


if (document.getElementById("card-area")) {
    document.addEventListener("DOMContentLoaded", function() {
        // creating a object collection for the cards
        let cardData = [{ name: "Ducati Paningale V1", image: "assets/images/ducati_paningale_v4.jpeg", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V2", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V3", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V4", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V5", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V6", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V7", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V8", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V9", power: 100, torque: 50, speed: 5.6, rpm: 44},
                        { name: "Ducati Paningale V10", power: 100, torque: 50, speed: 5.6, rpm: 44},]
        console.log(cardData);

        // implementing random sequence in cardData array
        shuffleCards(cardData);

        // creating two empty card arrays for player and computer
        let playerCards = [];
        let computerCards = [];

        // distributing the cards evenly into the arrays
        for (let i = 0; i < cardData.length; i++) {
            if (i % 2 === 0) {
                playerCards.push(cardData[i]);
            } else {
                computerCards.push(cardData[i]);
            }
        }
        console.log(playerCards);
        console.log(computerCards);

        // onclick eventlistener for all divs with the class of comparable
        let statDivs = document.getElementsByClassName("comparable");
        console.log(statDivs);

        for ( let i=0 ; i<statDivs.length ; i++ ) {
            console.log(statDivs[i]);
            statDivs[i].addEventListener("click", function() {
               alert("div got clicked");
               testGame();
            })
        }

        let i = 0;
        testGame()

        runGame(playerCards, computerCards);
        console.log(playerCards);
        playerCards.splice(0,1);
        console.log(playerCards);
    });
}


/* Using Fisher Yates Shuffle Algorithm for random shuffle of the cardData array */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) { 
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function runGame(playerCards, computerCards) {
    console.log("were in runGame");
    let gameCycles = playerCards.length;

    /*imgElement = document.createElement("img");
    imgElement.src = playerCards[0].image;
    document.getElementById("card-img-div").appendChild(imgElement);

    document.getElementById("bike-name").innerText = playerCards[0].name;
    document.getElementById("bike-power").innerText = playerCards[0].power;
    document.getElementById("bike-torque").innerText = playerCards[0].torque;
    document.getElementById("bike-speed").innerText = playerCards[0].speed;
    document.getElementById("bike-rpm").innerText = playerCards[0].rpm;*/
}

function compare() {

}


