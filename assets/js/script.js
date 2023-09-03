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
let compareRounds = (cardData.length/2);
let draftRounds = (cardData.length/2);

//test
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
                if( (compareRounds !== 0) && (compareRounds==draftRounds) ){
                    compare(stat);
                } else if (compareRounds == 0) {
                    alert("The game has ended!")
                }
                else {
                    alert("You need to draft a new Card before you can compare again");
                }
            })
        }

        // onclick eventlistener for draftcardbutton
        let draftCardButton = document.getElementById("draft-next-card");
        draftCardButton.addEventListener("click", function() {
            // player will be able to draft new card and finish one game cycle when he compared his card
            if( (draftRounds !== 1) && (compareRounds<draftRounds) ) {   
                topCard = playerCards[playerCards.length-1];
                topCardC = computerCards[playerCards.length-1];
                showCard(topCard);
                hideComputerCard();
                draftRounds--;
            } else if (draftRounds == 1) {
                alert("The game has ended!");
            }
            else {
                alert("You need to compare your Card first before you can go to your next card!");
            }
            console.log(draftRounds);
        })
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
        if ( playerCards[playerCards.length-1].torque > computerCards[computerCards.length-1].torque ) {
            alert("Player win");
            incrementScore("score-count-player");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        } else if ( playerCards[playerCards.length-1].torque == computerCards[computerCards.length-1].torque ) {
            alert("Both cards have got the same Torque, please choose another stat to compare!");
        }
        else { 
            alert("Computer win");
            incrementScore("score-count-computer");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        }
    } else if ( stat === "power") {
        if (playerCards[playerCards.length-1].power > computerCards[computerCards.length-1].power) {
            alert("Player win");
            incrementScore("score-count-player");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        } else if ( playerCards[playerCards.length-1].power == computerCards[computerCards.length-1].power ) {
            alert("Both cards have got the same Power, please choose another stat to compare!");
        } 
        else {
            alert("Computer win");
            incrementScore("score-count-computer");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        }
    } else if ( stat === "speed") {
        if (playerCards[playerCards.length-1].speed > computerCards[computerCards.length-1].speed) {
            alert("Player win");
            incrementScore("score-count-player");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        } else if ( playerCards[playerCards.length-1].speed == computerCards[computerCards.length-1].speed ) {
            alert("Both cards have got the same Speed, please choose another stat to compare!");
        } 
         else {
            alert("Computer win");
            incrementScore("score-count-computer");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        }
    } else if ( stat === "rpm") {
        if (playerCards[playerCards.length-1].rpm > computerCards[computerCards.length-1].rpm) {
            alert("Player win");
            incrementScore("score-count-player");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        } else if ( playerCards[playerCards.length-1].rpm == computerCards[computerCards.length-1].rpm ) {
            alert("Both cards have got the same rpm, please choose another stat to compare!");
        }
         else {
            alert("Computer win");
            incrementScore("score-count-computer");
            showComputerCard(computerCards[computerCards.length-1]);
            discardPile = playerCards.pop();
            discardPile = computerCards.pop();
            compareRounds--;
        }
    } 
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

function hideComputerCard() {
    document.getElementById("computer-card").innerHTML = '<img src="/assets/images/card_backside.jpg"></img>';
}
