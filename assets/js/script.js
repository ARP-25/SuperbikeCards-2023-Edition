/*jshint esversion: 6 */
// after dom elements are loaded we start to manipulate the elements
document.addEventListener("DOMContentLoaded", function() {

    // reveal elemend id="edition"
    setTimeout(function() {
        document.getElementById("edition").classList.add("show");
    }, 1000); 
        
    // when on index page execute following code in this function
    if (document.getElementById("start-game")) {
        document.getElementById("start-game").addEventListener("click", function() {

        // start-game element gets click event listener which checks if player name was entered  
        let playerInput = document.getElementById("player-input").value;
        // if player name is entered and <= 10 characters we go to game.html
        if ( (playerInput !== "") && (playerInput.length <= 10)) {
            localStorage.setItem('playerName', playerInput);
            console.log(playerInput);
            window.location.href = "game.html";
            
        } else if (playerInput.length > 10) {
            alert("Use a maximum of ten characters for your Player Name!");
        }
        else {
            alert("Please enter your Player Name!");
        }
        });
    }
});

// creating a object collection for the cards
let cardData = [{ name: "Aprilia RSV4 1100", image: "assets/images/aprilia_rsv4.jpg", power: 217, torque: 122, speed: 2.7, rpm: 13600},
                { name: "Ducati Panigale V2", image: "assets/images/ducati_panigale_v2.jpg", power: 155, torque: 104, speed: 3.2, rpm: 11500},
                { name: "Ducati Panigale V4", image: "assets/images/ducati_panigale_v4.jpeg", power: 214, torque: 124, speed: 2.7, rpm: 15500},
                { name: "Ducati Panigale V4R", image: "assets/images/ducati_panigale_v4_r.jpg", power: 234, torque: 119, speed: 2.6, rpm: 16500},
                { name: "Yamaha YZF R1", image: "assets/images/yamaha_yzf_r1.png", power: 200, torque: 112, speed: 2.7, rpm: 14000},
                { name: "Kawasaki Ninja", image: "assets/images/kawasaki_ninja_zx-10r.jpg", power:  203, torque: 115, speed: 2.8, rpm: 14000},
                { name: "Suzuki GSX-R1000", image: "assets/images/suzuki_gsx-R1000.jpg", power: 202, torque: 117, speed: 2.7, rpm: 14500},
                { name: "BMW S1000RR", image: "assets/images/bmw_s1000_RR.jpg", power: 205 , torque: 113, speed: 2.7, rpm: 14500},
                { name: "MV Agusta F4 RR", image: "assets/images/MV_Agusta_F4_RR.jpg", power:  201, torque: 111 , speed: 2.8, rpm: 13450},
                { name: "Honda CBR1000RR FB", image: "assets/images/honda_cbr1000rr_fireblade.jpg", power: 214, torque: 116, speed: 2.8, rpm: 13000},];

// ensuring random sequence in cardData array everytime script is executed
shuffleCards(cardData);

// creating two empty card arrays for player and computer
let playerCards = [];
let computerCards = [];
// emptry array for the popped of cards from the players
let discardPile = [];
// creating var for top card player
let topCard;
// creating car for top card computer
let topCardC;
// creating var for recent compared stat div
let recentComparedStat;
// game cycles depending on cardData array elements stored in two different variables
let compareRounds = (cardData.length/2);
let draftRounds = (cardData.length/2);

// distributing the cards evenly into the arrays
for (let i = 0; i < cardData.length; i++) {
    if (i % 2 === 0) {
        playerCards.push(cardData[i]);
    } else {
        computerCards.push(cardData[i]);
    }
}


// after dom elements are loaded we start to manipulate the elements
document.addEventListener("DOMContentLoaded", function() {

    // when on game page execute following script
    if (document.getElementById("card-area")) {
        
        // reveal elemend id="edition"
        setTimeout(function() {
        document.getElementById("edition").classList.add("show");
        }, 1000); 

        // add actual playername to score span
        let playerName = localStorage.getItem('playerName');
        document.getElementById("player-score").innerHTML = 'Score ' + playerName + ': <span id="score-count-player" class="score">0</span>';

        // displaying the players first card 
        showCard(playerCards[playerCards.length-1]);

        // onclick eventlistener for all divs with the class of comparable
        let statDivs = document.getElementsByClassName("comparable");
        for ( let i=0 ; i<statDivs.length ; i++ ) {
            statDivs[i].addEventListener("click", function() {                
                let stat = this.getAttribute("data-stat-type");
                recentComparedStat = stat;
                if( (compareRounds !== 0) && (compareRounds === draftRounds) ){
                    alert("You chose "+ this.getAttribute("data-stat-type") + " to compare!");
                    compare(stat, playerName);
                } else if (compareRounds === 0) {
                    alert("The game has ended! Click 'Go back to start Page' to start a new game");
                }
                else {
                    alert("You need to draft a new Card before you can compare again");
                }
            });
        }
        
        // DOMSubtreeModified eventlistener for all element with the class of score
        let scoreCount = document.getElementsByClassName('score');
        // this variable will store always the most recent modified score
        let actualValue;
        // add even listener for each score span
        for ( let score of scoreCount ) {
            score.addEventListener('DOMSubtreeModified', function() {
                // call the value of each span(score) element and parse it to int               
                actualValue = parseInt(score.textContent);
                // check if value is 3
                if ( actualValue === 3 ) {
                    // if value of player score is 3
                    if (score.id === "score-count-player") {
                        alert ("The winner is "+playerName+"!");
                    }
                    // if value of computer score is 3
                    if (score.id === "score-count-computer") {
                        alert ("The winner is Computer!");
                    }
                }
            });
        }

        // onclick eventlistener for draftcardbutton
        let draftCardButton = document.getElementById("draft-next-card");
        draftCardButton.addEventListener("click", function() {
            // player will be able to draft new card and finish one game cycle when he compared his card
            if( (draftRounds !== 1) && (compareRounds<draftRounds) && (actualValue !==3)) {   
                topCard = playerCards[playerCards.length-1];
                topCardC = computerCards[playerCards.length-1];
                unhighlightingComparedStats(recentComparedStat);
                showCard(topCard);
                hideComputerCard();
                draftRounds--;
            } else if (draftRounds === 1) {
                alert("The game has ended! Click 'Go back to start Page' to start a new game");
            } else if (actualValue === 3 ) {
                alert("The game has ended! Click 'Go back to start Page' to start a new game");
            }
            else {
                alert("You need to compare your Card first before you can draft your next card!");
            }

        });       
    }
});

// functions

// using fisher yates shuffle algorithm for random shuffle of the cardData array 
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) { 
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// compares the clicked stat in player card to computer card and pops of the top card of each
// we need the pop off at the end because for the next round of comparing we target the next card via playerCards[playerCards.length-1] index
function compare(stat, playerName) {
    if ( stat === "torque" ) {
        if ( playerCards[playerCards.length-1].torque > computerCards[computerCards.length-1].torque ) {           
            alert(playerName+ " wins round");
            wrapper("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].torque == computerCards[computerCards.length-1].torque ) {
            alert("Both cards have got the same Torque, please choose another stat to compare!");
        }
        else { 
            alert("Computer wins round");
            wrapper("score-count-computer", stat);
        }
    } else if ( stat === "power") {
        if (playerCards[playerCards.length-1].power > computerCards[computerCards.length-1].power) {
            alert(playerName+ " wins round");
            wrapper("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].power == computerCards[computerCards.length-1].power ) {
            alert("Both cards have got the same Power, please choose another stat to compare!");
        } 
        else {
            alert("Computer wins round");
            wrapper("score-count-computer", stat);
        }
    } else if ( stat === "speed") {
        if (playerCards[playerCards.length-1].speed < computerCards[computerCards.length-1].speed) {
            alert(playerName+ " wins round");
            wrapper("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].speed == computerCards[computerCards.length-1].speed ) {
            alert("Both cards have got the same Speed, please choose another stat to compare!");
        } 
         else {
            alert("Computer wins round");
            wrapper("score-count-computer", stat);
        }
    } else if ( stat === "rpm") {
        if (playerCards[playerCards.length-1].rpm > computerCards[computerCards.length-1].rpm) {
            alert(playerName+ " wins round");
            wrapper("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].rpm == computerCards[computerCards.length-1].rpm ) {
            alert("Both cards have got the same rpm, please choose another stat to compare!");
        }
         else {
            alert("Computer wins round");
            wrapper("score-count-computer", stat);
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
    // manipulating computer-card div
    document.getElementById("computer-card").innerHTML = '<div id="card-name-div" class="card-name-style"><p><span id="bike-name-computer">Ducati</span></p></div><div id="card-img-div-computer" class="card-img-style"></div><div class="comparable card-stat-style" data-stat-type="power"><p>Power:</p> <span id="bike-power-computer">0</span><p> HP</p></div><div class="comparable card-stat-style" data-stat-type="torque"><p>Torque:</p> <span id="bike-torque-computer">0</span><p> Nm</p></div><div class="comparable card-stat-style" data-stat-type="speed"><p>0-100 km/h:</p> <span id="bike-speed-computer">0</span><p> s</p></div><div class="comparable card-stat-style" data-stat-type="rpm"><p>mRPM:</p> <span id="bike-rpm-computer">0</span><p> U/min</p></div>';
    // code to show image of card
    let bikeImg = document.createElement("img");
    bikeImg.src = card.image; 
    bikeImg.alt = card.name; 
    document.getElementById("card-img-div-computer").appendChild(bikeImg);
    // code to show all stats of the card
    document.getElementById("bike-name-computer").innerText = card.name;                        
    document.getElementById("bike-power-computer").innerText = card.power;
    document.getElementById("bike-torque-computer").innerText = card.torque;
    document.getElementById("bike-speed-computer").innerText = card.speed;
    document.getElementById("bike-rpm-computer").innerText = card.rpm;
}

// hiding computer card
function hideComputerCard() {
    document.getElementById("computer-card").innerHTML = '<img src="assets/images/card_backside.jpg"></img>';
    document.getElementById("computer-card").alt = "Backside of the Computer Card";
}

// highlighting the compared stats
function highlightComparedStats(stat) {
    let statDivs = document.querySelectorAll('[data-stat-type="'+stat+'"]');
    for (let comparedStat of statDivs) {
        comparedStat.classList.add('red-highlight');
    }
}

// unhighlighting the compared stats
function unhighlightingComparedStats(stat) {
    let statDivs = document.querySelectorAll('[data-stat-type="'+stat+'"]');
    for (let comparedStat of statDivs) {
        comparedStat.classList.remove('red-highlight');
    }
}

// wrapper function
function wrapper(winner, stat) {
    incrementScore(winner);
    showComputerCard(computerCards[computerCards.length-1]);
    discardPile = playerCards.pop();
    discardPile = computerCards.pop();
    compareRounds--;
    highlightComparedStats(stat);
}
