// when on index page execute following script
if (document.getElementById("start-game")) {
    document.getElementById("start-game").addEventListener("click", function() {
      // start-game element gets click event listener which checks if player name was entered  
      let playerInput = document.getElementById("player-input").value;
      // if player name is entered we go to game.html
      if (playerInput !== "") {
        window.location.href = "game.html";
      } else {
        alert("Please enter your Player Name!");
      }
    });
}

// creating a object collection for the cards
let cardData = [{ name: "Ducati Paningale V1", image: "assets/images/ducati_paningale_v4.jpeg", power: 90, torque: 1, speed: 1, rpm: 1},
                { name: "Ducati Paningale V2", image: "assets/images/ducati_paningale_v4.jpeg", power: 100, torque: 2, speed: 2, rpm: 2},
                { name: "Ducati Paningale V3", image: "assets/images/ducati_paningale_v4.jpeg", power: 200, torque: 3, speed: 3, rpm: 3},
                { name: "Ducati Paningale V4", image: "assets/images/ducati_paningale_v4.jpeg", power: 300, torque: 4, speed: 4, rpm: 4},
                { name: "Ducati Paningale V5", image: "assets/images/ducati_paningale_v4.jpeg", power: 400, torque: 5, speed: 5, rpm: 5},
                { name: "Ducati Paningale V6", image: "assets/images/ducati_paningale_v4.jpeg", power: 500, torque: 6, speed: 6, rpm: 6},
                { name: "Ducati Paningale V7", image: "assets/images/ducati_paningale_v4.jpeg", power: 600, torque: 7, speed: 7, rpm: 7},
                { name: "Ducati Paningale V8", image: "assets/images/ducati_paningale_v4.jpeg", power: 700, torque: 8, speed: 8, rpm: 8},
                { name: "Ducati Paningale V9", image: "assets/images/ducati_paningale_v4.jpeg", power: 800, torque: 9, speed: 9, rpm: 9},
                { name: "Ducati Paningale V10", image: "assets/images/ducati_paningale_v4.jpeg", power: 900, torque: 50, speed: 10, rpm: 10},]

// ensuring random sequence in cardData array
shuffleCards(cardData);
console.log(cardData);

// creating two empty card arrays for player and computer
let playerCards = [];
let computerCards = [];
let discardPile = [];
let topCard;

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

// when on game page execute following script
if (document.getElementById("card-area")) {
    // after dom elements are loaded we add a click event listener to all elements with the class "comparable"
    document.addEventListener("DOMContentLoaded", function() {
        showCard(playerCards[playerCards.length-1]);
        let statDivs = document.getElementsByClassName("comparable");
        // onclick eventlistener for all divs with the class of comparable
        for ( let i=0 ; i<statDivs.length ; i++ ) {
            statDivs[i].addEventListener("click", function() {
                alert("div got clicked");
                let stat = this.getAttribute("stat-type");
                if( cycles !== 0 ){
                    compare(stat);
                    topCard = playerCards[playerCards.length-1];
                    showCard(topCard);
                    console.log(topCard.name);
                    cycles--;
                } else {
                    alert("game has ended");
                }
            })
        }
    });
}

// using fisher Yytes shuffle algorithm for random shuffle of the cardData array 
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) { 
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// compares the clicked stat in player card to computer card and pops of the top card of each
// we need the pop off at the end because for the next round of comparing we target the next card via playerCards[playerCards.length-1] index
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
    discardPile = playerCards.pop();
    console.log(playerCards.length);
}

// incrementing score
function incrementScore(scorer) {
    document.getElementById(scorer).innerText++;
}

// showing card
function showCard(card) {
    // code to show image of card
    let bikeImg = document.createElement("img");
    bikeImg.src = card.image; 
    bikeImg.alt = card.name; 
    document.getElementById("card-img-div").appendChild(bikeImg);
    // code to show all stats of the card
    document.getElementById("bike-name").innerText = card.name;
    document.getElementById("card-img-div").removeChild(document.getElementById("card-img-div").firstChild);  
    document.getElementById("bike-power").innerText = card.power;
    document.getElementById("bike-torque").innerText = card.torque;
    document.getElementById("bike-speed").innerText = card.speed;
    document.getElementById("bike-rpm").innerText = card.rpm;
}


