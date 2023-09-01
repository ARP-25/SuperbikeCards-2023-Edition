console.log("connected");
document.getElementById("start-game").addEventListener("click",function() {

        console.log('yo');
        let playerInput = document.getElementById("player-input").value;
        if (playerInput !== "") {
            window.location.href = "game.html";
        }
        else {
            alert("Please enter your Player Name!")
        }
    }
);