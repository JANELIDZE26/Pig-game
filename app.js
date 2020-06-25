/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var WIN_SCORE = 50;
var scores,roundScore,activePlayer,gameActive;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gameActive){
        var dice=Math.floor(Math.random()*6)+1;
        var dice1=Math.floor(Math.random()*6)+1;
        var diceDOM = document.querySelector(".dice");
        var diceDOM1= document.getElementById("dice1");
        diceDOM.src = "dice-"+dice+".png";
        diceDOM.style.display="block";
        diceDOM1.src="dice-"+dice1+".png";
        diceDOM1.style.display="block";

        document.getElementById("score_input").disabled=true;
        console.log(dice,dice1);
        if( dice !== 1 && dice1 !== 1){
            roundScore += dice+dice1;
            document.getElementById("current-"+activePlayer).textContent = roundScore;
            if (dice===6 && dice1==6){
                scores[activePlayer] = 0;
                document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }         
        }
        else{
            nextPlayer();
        }  
        getScore()
    }
   }
)
document.querySelector(".btn-hold").addEventListener("click",function() {
    if(gameActive){
        scores[activePlayer] += roundScore;    
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= WIN_SCORE){
            document.querySelector("#name-"+activePlayer).textContent = "Winner";
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".dice").style.display = "none";
            document.querySelector("#dice1").style.display = "none";
            gameActive=false;
        }
        else {
            nextPlayer();
        }
        
    }
})
document.querySelector(".btn-new").addEventListener("click",init);
// document.getElementById("score_input").addEventListener("keydown",function(event) {
//     if(event.keyCode == 13){
//         checkScore=false
//         getScore();
//     }
// })
function getScore() {
    var input=document.getElementById("score_input").value;
    WIN_SCORE = input;
}
function init() {
    scores = [0,0];
    roundScore=0;
    activePlayer = 0;
    gameActive=true;
    
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice1").style.display = "none";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector("#name-0").textContent = "player1";
    document.querySelector("#name-1").textContent = "player2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.getElementById("score_input").value="";
    document.getElementById("score_input").disabled=false;
} 
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1:activePlayer = 0;
    roundScore = 0;
    previousDice=0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice1").style.display = "none";
}