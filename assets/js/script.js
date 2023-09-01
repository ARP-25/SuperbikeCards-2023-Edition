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

// creating a object collection for the cards
let cardData = [{ name: "Ducati Paningale V1", image: "assets/images/ducati_paningale_v4.jpeg", power: 90, torque: 1, speed: 1, rpm: 1},
                { name: "Ducati Paningale V2", power: 100, torque: 2, speed: 2, rpm: 2},
                { name: "Ducati Paningale V3", power: 200, torque: 3, speed: 3, rpm: 3},
                { name: "Ducati Paningale V4", power: 300, torque: 4, speed: 4, rpm: 4},
                { name: "Ducati Paningale V5", power: 400, torque: 5, speed: 5, rpm: 5},
                { name: "Ducati Paningale V6", power: 500, torque: 6, speed: 6, rpm: 6},
                { name: "Ducati Paningale V7", power: 600, torque: 7, speed: 7, rpm: 7},
                { name: "Ducati Paningale V8", power: 700, torque: 8, speed: 8, rpm: 8},
                { name: "Ducati Paningale V9", power: 800, torque: 9, speed: 9, rpm: 9},
                { name: "Ducati Paningale V10", power: 900, torque: 50, speed: 10, rpm: 10},]

// implementing random sequence in cardData array
shuffleCards(cardData);
console.log(cardData);

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
// game cycles depending on card amount
let cycles = cardData.length/2;
console.log(cycles);

console.log(playerCards);
console.log(computerCards);

// after dom elements are loaded we add a click event listener to all elements with the class "comparable"
if (document.getElementById("card-area")) {
    document.addEventListener("DOMContentLoaded", function() {
        let statDivs = document.getElementsByClassName("comparable");
        // onclick eventlistener for all divs with the class of comparable
        for ( let i=0 ; i<statDivs.length ; i++ ) {
            statDivs[i].addEventListener("click", function() {
                alert("div got clicked");
                let stat = this.getAttribute("stat-type");
                if( cycles !== 0 ){
                    compare(stat);
                    cycles--;
                } else {
                    alert("game has ended");
                }
            })
        }
    });
}



/* Using Fisher Yates Shuffle Algorithm for random shuffle of the cardData array */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) { 
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function compare(stat) {
    if ( stat === "torque" ) {
        if (playerCards[playerCards.length-1].torque > computerCards[computerCards.length-1].torque) {
            alert("Player win");
            incrementScore("score-count-player");
        } else {
            alert("Computer win");
            incrementScore("score-count-computer");
        }
    } else if ( stat === "power") {
        if (playerCards[playerCards.length-1].power > computerCards[computerCards.length-1].power) {
            alert("Player win");
            incrementScore("score-count-player");
        } else {
            alert("Computer win");
            incrementScore("score-count-computer");
        }
    } else if ( stat === "speed") {
        if (playerCards[playerCards.length-1].speed > computerCards[computerCards.length-1].speed) {
            alert("Player win");
            incrementScore("score-count-player");
        } else {
            alert("Computer win");
            incrementScore("score-count-computer");
        }
    } else if ( stat === "rpm") {
        if (playerCards[playerCards.length-1].rpm > computerCards[computerCards.length-1].rpm) {
            alert("Player win");
            incrementScore("score-count-player");
        } else {
            alert("Computer win");
            incrementScore("score-count-computer");
        }
    } 
}

function incrementScore(scorer) {
    document.getElementById(scorer).innerText++;
}


