/*jshint esversion: 6 */

// card object array
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

// two empty card arrays for player and computer
let playerCards = [];
let computerCards = [];

// empty array for the popped of cards from the player/computer array
let discardPile = [];

// var top card player
let topCard;

// var top card computer
let topCardC;

// creating var for recent compared stat div
let recentComparedStat;

// game cycles depending on cardData array elements stored in two different variables
let compareRounds = (cardData.length/2);
let draftRounds = (cardData.length/2);

// ensuring random sequence in cardData array everytime script is executed
shuffleCards(cardData);

// get modal and modaltext
let draftModalText = document.getElementById("draftModalText"); 
let draftModal = document.getElementById("draftModal"); 


// distributing the cards evenly into the arrays
for (let i = 0; i < cardData.length; i++) {
    if (i % 2 === 0) {
        playerCards.push(cardData[i]);
    } else {
        computerCards.push(cardData[i]);
    }
}


/**
 * Event listener for the DOMContentLoaded event.
 * This function is executed when the DOM is fully loaded on index.html and ready for manipulation.
 * function(): 
 * Edition in header get revealed,
 * Closing Tags in Modal get eventListener,
 * Start Game Button gets eventListener
 */
document.addEventListener("DOMContentLoaded", function() {

    // reveal elemend id="edition"
    setTimeout(function() {
        document.getElementById("edition").classList.add("show");
    }, 1000); 

    // listener for all modal closing tags
    wrapperCloseModal();    

    // when on index page execute following code 
    if (document.getElementById("start-game")) {

        // start-game element gets click event listener which checks if player name was entered
        document.getElementById("start-game").addEventListener("click", function() {
            let playerInput = document.getElementById("player-input").value;
            // if player name is entered and <= 10 characters we go to game.html
            if ( (playerInput !== "") && (playerInput.length <= 10)) {
                localStorage.setItem('playerName', playerInput);
                console.log(playerInput);
                window.location.href = "game.html";           
            } else if (playerInput.length > 10) {
                showModal("Use a maximum of ten characters for your Player Name!");
            }
            else {
                showModal("Please enter your Player Name!");
            }
            });
        }

});

/**
 * Event listener for the DOMContentLoaded event.
 * This function is executed when the DOM is fully loaded on game.html and ready for manipulation.
 * function(): 
 * Player Name gets dispalyed in Score Area,
 * Player first card gets displayed in Card Area,
 * Elements of class="comparable" get eventListener,
 * Elements of class="score" get MutationObserver,
 * Element of id="draft-next-card" get eventListener,
 */
document.addEventListener("DOMContentLoaded", function() {

    // listener for all moding closing tags
    wrapperCloseModal();

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
                    showModal("You chose "+ this.getAttribute("data-stat-type") + " to compare!");
                    compare(stat, playerName);
                } else if (compareRounds === 0) {
                    showModal("The game has ended! Click 'Go back to start Page' to start a new game");
                }
                else {                   
                    showModal("You need to draft a new Card before you can compare again");
                }
            });
        }
    
        // this variable will store always the most recent modified score
        let actualValue;
        // calling all elements of class "score"
        const scoreElements = document.querySelectorAll('.score');
        // creating instant of MutationObserver 
        const observer = new MutationObserver(function(mutationsList) {
            for (const mutation of mutationsList) {               
                // storing textContent(mutation) of observed target in actualValue
                actualValue = parseInt(mutation.target.textContent);
                // checking if text content is '3'
                if (mutation.target.textContent === '3') {
                        // if value of player score is 3
                        if (mutation.target.id === "score-count-player") {
                            showModal ("The winner is "+playerName+"!");
                        }
                        // if value of computer score is 3
                        if (mutation.target.id === "score-count-computer") {
                            showModal ("The winner is Computer!");
                        }
                }
            }
        });
        // configurating the observer
        const observerConfig = { childList: true, subtree: true };
        // starting to observe the object
        for (const scoreElement of scoreElements) {
            observer.observe(scoreElement, observerConfig);
        }
        
        // onclick eventlistener for draftcardbutton
        let draftCardButton = document.getElementById("draft-next-card");
        draftCardButton.addEventListener("click", function() {
            // player will be able to draft new card and finish one game cycle when he compared his card
            if( (draftRounds !== 1) && (compareRounds<draftRounds) && (actualValue !==3)) {   
                topCard = playerCards[playerCards.length-1];
                topCardC = computerCards[playerCards.length-1];
                unhighlightingComparedStats();
                showCard(topCard);
                hideComputerCard();
                draftRounds--;
            } else if (draftRounds === 1) {
                showModal("The game has ended! Click 'Go back to start Page' to start a new game");
            } else if (actualValue === 3 ) {
                showModal("The game has ended! Click 'Go back to start Page' to start a new game");
            }
            else {
                showModal("You need to compare your Card first before you can draft your next card!");
            }
        });              
    }
});


// seperate functions 

/**Fisher-Yates shuffle algorithm.
 * @param {*} cards 
 */
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) { 
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}


/**
 * Compares the clicked stat.
 * @param {*} stat Stat that got compared
 * @param {*} playerName Player Name
 */
function compare(stat, playerName) {
    if ( stat === "torque" ) {
        if (playerCards[playerCards.length-1].torque > computerCards[computerCards.length-1].torque) {           
            showModal(playerName+ " wins round");
            wrapperCompare("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].torque == computerCards[computerCards.length-1].torque ) {
            showModal("Both cards have got the same Torque, please choose another stat to compare!");
        }
        else { 
            showModal("Computer wins round");
            wrapperCompare("score-count-computer", stat);
        }
    } else if ( stat === "power") {
        if (playerCards[playerCards.length-1].power > computerCards[computerCards.length-1].power) {
            showModal(playerName+ " wins round");
            wrapperCompare("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].power == computerCards[computerCards.length-1].power ) {
            showModal("Both cards have got the same Power, please choose another stat to compare!");
        } 
        else {
            showModal("Computer wins round");
            wrapperCompare("score-count-computer", stat);
        }
    } else if ( stat === "speed") {
        if (playerCards[playerCards.length-1].speed < computerCards[computerCards.length-1].speed) {
            showModal(playerName+ " wins round");
            wrapperCompare("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].speed == computerCards[computerCards.length-1].speed ) {
            showModal("Both cards have got the same Speed, please choose another stat to compare!");
        } 
         else {
            showModal("Computer wins round");
            wrapperCompare("score-count-computer", stat);
        }
    } else if ( stat === "rpm") {
        if (playerCards[playerCards.length-1].rpm > computerCards[computerCards.length-1].rpm) {
            showModal(playerName+ " wins round");
            wrapperCompare("score-count-player", stat);
        } else if ( playerCards[playerCards.length-1].rpm == computerCards[computerCards.length-1].rpm ) {
            showModal("Both cards have got the same rpm, please choose another stat to compare!");
        }
         else {
            showModal("Computer wins round");
            wrapperCompare("score-count-computer", stat);
        }
    } 
}

/**
 * Increments Score and displays it.
 * @param {*} scorer Player who won the round
 */
function incrementScore(scorer) {
    document.getElementById(scorer).innerText++;
}

/**
 * Shows Player Card.
 * @param {*} card 
 */
function showCard(card) {
    // show image and name of card
    let bikeImg = document.createElement("img");
    bikeImg.src = card.image; 
    bikeImg.alt = card.name; 
    document.getElementById("card-img-div").appendChild(bikeImg);
    // display all stats of the card, remove previous card image
    document.getElementById("bike-name").innerText = card.name;
    document.getElementById("card-img-div").removeChild(document.getElementById("card-img-div").firstChild);  
    document.getElementById("bike-power").innerText = card.power;
    document.getElementById("bike-torque").innerText = card.torque;
    document.getElementById("bike-speed").innerText = card.speed;
    document.getElementById("bike-rpm").innerText = card.rpm;
}

/**
 * Shows Computer Card
 * @param {*} card 
 */
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

/**
 * Hides Computer Card
 */
function hideComputerCard() {
    document.getElementById("computer-card").innerHTML = '<img src="assets/images/card_backside.jpg"></img>';
    document.getElementById("computer-card").alt = "Backside of the Computer Card";
}

/**
 * Highlights the compared stat.
 * @param {*} stat 
 */
function highlightComparedStat(stat) {
    let statDivs = document.querySelectorAll('[data-stat-type="'+stat+'"]');
    for (let comparedStat of statDivs) {
        comparedStat.classList.add('red-highlight');
    }
}

/**
 * Unhighlights the compared stats.
 */
function unhighlightingComparedStats() {
    let statDivs = document.querySelectorAll('[data-stat-type');
    for (let comparedStat of statDivs) {
        comparedStat.classList.remove('red-highlight');
    }
}

/**
 * Wrapper Function in Compare Function.
 * @param {*} winner Winner of the round
 * @param {*} stat Stat which got compared
 */
function wrapperCompare(winner, stat) {
    incrementScore(winner);
    showComputerCard(computerCards[computerCards.length-1]);
    discardPile = playerCards.pop();
    discardPile = computerCards.pop();
    compareRounds--;
    highlightComparedStat(stat);
}

/**
 * Wrapper Function for text content and display attribute of modal.
 * @param {*} message Message that gets displayed
 */
function showModal(message) {
    draftModalText.textContent = message;
    draftModal.style.display = "block";
}

/**
 * Closing Modal
 */
function closeModal() {
    draftModal.style.display = "none";
}

/**
 * Elements of class "close" get eventListener.
 */
function wrapperCloseModal(){
    document.querySelector(".close").addEventListener("click", closeModal);
    window.addEventListener("click", function(event) {
        if (event.target === draftModal) {
            closeModal();
        }
    });
}
