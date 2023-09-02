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
let cardData = [{ name: "Aprilia RSV4 1100", image: "assets/images/aprilia_rsv4.jpg", power: 217, torque: 122, speed: 2.7, rpm: 13600},
                { name: "Ducati Panigale V2", image: "assets/images/ducati_panigale_v2.jpg", power: 155, torque: 104, speed: 3.2, rpm: 11500},
                { name: "Ducati Panigale V4", image: "assets/images/ducati_panigale_v4.jpeg", power: 214, torque: 124, speed: 2.7, rpm: 15500},
                { name: "Ducati Panigale V4R", image: "assets/images/ducati_panigale_v4_r.jpg", power: 234, torque: 119, speed: 2.6, rpm: 16500},
                { name: "Yamaha YZF R1", image: "assets/images/yamaha_yzf_r1.png", power: 200, torque: 112, speed: 2.7, rpm: 14000},
                { name: "Kawasaki Ninja", image: "assets/images/kawasaki_ninja_zx-10r.jpg", power:  203, torque: 115, speed: 2.8, rpm: 14000},
                { name: "Suzuki GSX-R1000", image: "assets/images/suzuki_gsx-R1000.jpg", power: 202, torque: 117, speed: 2.7, rpm: 14500},
                { name: "BMW S1000RR", image: "assets/images/bmw_s1000_RR.jpg", power: 205 , torque: 113, speed: 2.7, rpm: 14.500},
                { name: "MV Agusta F4 RR", image: "assets/images/MV_Agusta_F4_RR.jpg", power:  201, torque: 111 , speed: 2.8, rpm: 13450},
                { name: "Honda CBR1000RR FB", image: "assets/images/honda_cbr1000rr_fireblade.jpg", power: 214, torque: 116, speed: 2.8, rpm: 13000},]

// ensuring random sequence in cardData array
shuffleCards(cardData);
console.log(cardData);

// creating two empty card arrays for player and computer
let playerCards = [];
let computerCards = [];
let discardPile = [];
let topCard;
let topCardC;

// distributing the cards evenly into the arrays
for (let i = 0; i < cardData.length; i++) {
    if (i % 2 === 0) {
        playerCards.push(cardData[i]);
    } else {
        computerCards.push(cardData[i]);
    }
}

// game cycles depending on card amount
let cycles = (cardData.length/2)-1;
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
                console.log(cycles);
                if( cycles !== 0 ){
                    compare(stat);
                    topCard = playerCards[playerCards.length-1];
                    topCardC = computerCards[playerCards.length-1];
                    showCard(topCard);
                    cycles--;
                } else {
                    alert("game has ended");
                }
            })
        }
        // oclick eventlistener for next card function ()
        // hier soll erst die neue karte gezogen und somit angezeigt werden
        // davor findet dieser prozess bei click auf stats statt, das soll dort entfernt werden und stattdessen nur die compare function und showComputerCard auslösen
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
    discardPile = computerCards.pop();
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

// show computer card
function showComputerCard(card) {
    document.getElementById("computer-card").innerHTML = '<div id="card-name-div" class="card-name-style"><p><span id="bike-name-computer">Ducati</span></p></div><div id="card-img-div-computer" class="card-img-style"></div><div id="card-stat-div" class="comparable card-stat-style" stat-type="power"><p>Power: <span id="bike-power-computer">0</span> HP</p></div><div id="card-stat-div" class="comparable card-stat-style" stat-type="torque"><p>Torque: <span id="bike-torque-computer">0</span> Nm</p></div><div id="card-stat-div" class="comparable card-stat-style" stat-type="speed"><p>0-100 km/h: <span id="bike-speed-computer">0</span> s</p></div><div id="card-stat-div" class="comparable card-stat-style" stat-type="rpm"><p>max RPM: <span id="bike-rpm-computer">0</span> U/min</p></div>'

    // code to show image of card
    let bikeImg = document.createElement("img");
    bikeImg.src = card.image; 
    bikeImg.alt = card.name; 
    document.getElementById("card-img-div-computer").appendChild(bikeImg);
    // code to show all stats of the card
    document.getElementById("bike-name-computer").innerText = card.name;
       
    //document.getElementById("card-img-div-computer").removeChild(document.getElementById("card-img-div-computer").firstChild);                  
    document.getElementById("bike-power-computer").innerText = card.power;
    document.getElementById("bike-torque-computer").innerText = card.torque;
    document.getElementById("bike-speed-computer").innerText = card.speed;
    document.getElementById("bike-rpm-computer").innerText = card.rpm;
}

