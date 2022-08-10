console.clear();

let plays = 0;
let round = 1;

// The factory function to create the player object, and hold associated functions
function playerFactory(name, type, score, scoreAdded, marker) {
    return {
        name: name,
        type: type,
        score: score,
        scoreAdded: scoreAdded,
        marker: marker,
        botAutoMark(grid) {
            botPlaced = false;
            while (botPlaced==false && plays!=4) {
                randomIdx = randomiseNo();
                if (gridArr[randomIdx].innerHTML=='') {
                    gridArr[randomIdx].innerHTML = playerTwo.marker;
                    botPlaced = true;
                }
            }
        },
        markGrid(grid,i) {
            if (grid.innerHTML != '') {console.log('nope!'); return};  // Check whether marker already placed or not
            if (grid.innerHTML == '') {grid.innerHTML = marker};  // Place the respective marker if empty

            // Placing the subsequent bot counter
            playerTwo.botAutoMark();

            // Checking whether the game is over
            plays = plays + 1;
            if (plays==5) {itsOver()}
        },
    };
}

// Second Factory function used to store game results
function gameBoardFactory(outcome, winner) {
    return {
        outcome: outcome,
        winner: winner,
    }
}

// Create a random number to help the easy bot place on the grid
function randomiseNo() {
    let randomidx = Math.floor(Math.random() * 9);
    return randomidx
}

function itsOver() {
    plays = 0; // Reset the plays made
    checkWin();
}

function updateWinner(outcome, winner) {
    if (outcome=='Win!') {
        if (winner=='p1') {
            playerOne.score = playerOne.score + 1;
            playerOneElement = document.getElementById('player-one');
            playerOneElement.innerHTML = playerOne.score;
        }
        if (winner=='p2') {
            playerTwo.score = playerTwo.score + 1;
            playerTwoElement = document.getElementById('player-two');
            playerTwoElement.innerHTML = playerTwo.score;
        }
    }
}

function checkWin() {
    const gameBoard = gameBoardFactory("Nobody wins.", "");  // Defining default object

    // // Extract square elements
    // sqOne = document.getElementById('sq-1').innerHTML;
    // sqTwo = document.getElementById('sq-2').innerHTML;
    // sqThree = document.getElementById('sq-3').innerHTML;
    // sqFour = document.getElementById('sq-4').innerHTML;
    // sqFive = document.getElementById('sq-5').innerHTML;
    // sqSix = document.getElementById('sq-6').innerHTML;
    // sqSeven = document.getElementById('sq-7').innerHTML;
    // sqEight = document.getElementById('sq-8').innerHTML;
    // sqNine = document.getElementById('sq-9').innerHTML;

    // // Extract square elements (re-factored to reduce code)
    square = [''];
    for (j=1; j<10; j++) {
        square[j] = document.getElementsByClassName('grid')[j-1].innerHTML;
    }

    function updateScore(winningMarker) {
        if (gameBoard.winner==playerOne.name && winningMarker==playerTwo.marker
            || gameBoard.winner==playerTwo.name && winningMarker==playerOne.marker) {
            gameBoard.winner = "It's a ";
            gameBoard.outcome = 'Draw...';
            return
        }
        if (winningMarker==playerOne.marker) {
            gameBoard.winner = playerOne.name;
            gameBoard.outcome = 'Wins!';
            if (playerOne.scoreAdded==false) {playerOne.score = playerOne.score + 1};
            playerOne.scoreAdded = true;
        }
        if (winningMarker==playerTwo.marker) {
            gameBoard.winner = playerTwo.name;
            gameBoard.outcome = 'Wins!';
            if (playerTwo.scoreAdded==false) {playerTwo.score = playerTwo.score + 1};
            playerTwo.scoreAdded = true;
        }
        return
    }
    
    // Check horizontal win
    if (square[1]==square[2] && square[2]==square[3]) {updateScore(square[1])}
    if (square[4]==square[5] && square[5]==square[6]) {updateScore(square[4])}
    if (square[7]==square[8] && square[8]==square[9]) {updateScore(square[7])}

    // Check vertical win
    if (square[1]==square[4] && square[4]==square[7]) {updateScore(square[1])}
    if (square[2]==square[5] && square[5]==square[8]) {updateScore(square[2])}
    if (square[3]==square[6] && square[6]==square[9]) {updateScore(square[3])}

    // Check diagonal win
    if (square[1]==square[5] && square[5]==square[9]) {updateScore(square[1])}
    if (square[3]==square[5] && square[5]==square[7]) {updateScore(square[3])}

    // Update Winner
    updateWinner(gameBoard.outcome, gameBoard.winner);

    // Update the display
    if (gameBoard.outcome!='Draw...') {
        document.getElementById('player-one').innerHTML = 'Player One | ' + playerOne.score;
        document.getElementById('player-two').innerHTML = 'Player Two | ' + playerTwo.score;
        playerOne.scoreAdded = false;
        playerTwo.scoreAdded = false;
    }
    round = round + 1;
    document.getElementById('round-container').innerHTML = 'Round ' + round;
    // Make the outcome call
    overAlert = "It's over.\n" + gameBoard.winner + ' ' + gameBoard.outcome; 
    alert(overAlert);
}

// Creating the Player objects
const playerOne = playerFactory('Player 1','human', 0, false, 'x');
const playerTwo = playerFactory('Player 2','bot', 0, false, 'o');

// Looping through and adding the eventListeners to the grid
gridArr = document.getElementsByClassName('grid');
for (i=0; i<(gridArr.length); i++) {
    grid = gridArr[i];
    grid.addEventListener('click', playerOne.markGrid.bind(this,grid,i));
}

// Add eventlistener to reset button
reset = document.getElementById('reset-game');
reset.addEventListener('click', () => resetGrid());
function resetGrid() {
    gridArr = document.getElementsByClassName('grid');
    for (i=0; i<(gridArr.length); i++) {
        gridArr[i].innerHTML = '';
    }
}
  
console.log('-------')