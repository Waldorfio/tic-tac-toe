console.clear();

let arr = [0,1,2,3,4,5,6,7,8];
let marked = 0;
let scoreOne = 0;
let scoreTwo = 0;

// The factory function to create the player object, and hold associated functions
function playerFactory(name, type, score, marker) {
    return {
        name: name,
        type: type,
        score: score,
        marker: marker,
        // botAutoMark1() {
        //     for (i=0; i<(gridArr.length); i++) {
        //         grid = gridArr[i];
        //         if (grid.innerHTML == '') {
        //             grid.innerHTML = 'o';
        //             break;
        //         }
        //     }
        // },
        botAutoMark(grid) {
            grid.innerHTML = 'o';
            console.log('bot placed o')
        },
        markGrid(grid,i) {
            if (grid.innerHTML != '') {console.log('nope!'); return};  // Check whether marker already placed or not
            if (grid.innerHTML == '') {grid.innerHTML = marker};  // Place the respective marker if empty

            // Placing the subsequent bot counter
            arr.splice(i, 1); // Renove the current grid from the available array
            idx = randomGridIdx(arr);
            playerTwo.botAutoMark(gridArr[idx]);
            arr.splice(idx, 1);

            // Checking whether the game is over
            marked = marked + 1;
            if (marked==5) {itsOver()}
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

function randomGridIdx(arr) {
    let idx = arr[Math.floor(Math.random() * arr.length)];
    return idx
}

function itsOver() {
    scoreOne = scoreOne + 1;
    marked = 0;
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
    const gameBoard = gameBoardFactory("Draw...", "It's a");  // Defining default object

    // Extract square elements
    sqOne = document.getElementById('sq-1').innerHTML;
    sqTwo = document.getElementById('sq-2').innerHTML;
    sqThree = document.getElementById('sq-3').innerHTML;
    sqFour = document.getElementById('sq-4').innerHTML;
    sqFive = document.getElementById('sq-5').innerHTML;
    sqSix = document.getElementById('sq-6').innerHTML;
    sqSeven = document.getElementById('sq-7').innerHTML;
    sqEight = document.getElementById('sq-8').innerHTML;
    sqNine = document.getElementById('sq-9').innerHTML;
    
    function updateScore(winningMarker) {
        console.log('yes! it worked')
        if (winningMarker==playerOne.marker) {gameBoard.winner=playerOne.name};
        if (winningMarker==playerTwo.marker) {gameBoard.winner=playerTwo.name};
        gameBoard.outcome = 'Wins!';
        return
    }
    
    // Check horizontal win
    if (sqOne==sqTwo && sqTwo==sqThree) {updateScore(sqOne)}
    if (sqFour==sqFive && sqFive==sqSix) {updateScore(sqFour)}
    if (sqSeven==sqEight && sqEight==sqNine) {updateScore(sqSeven)}

    // Check vertical win
    if (sqOne==sqFour && sqFour==sqSeven) {updateScore(sqOne)}
    if (sqTwo==sqFive && sqFive==sqEight) {updateScore(sqTwo)}
    if (sqThree==sqSix && sqSix==sqNine) {updateScore(sqThree)}

    // Check diagonal win
    if (sqOne==sqFive && sqFive==sqNine) {updateScore(sqOne)}
    if (sqThree==sqFive && sqFive==sqSeven) {updateScore(sqThree)}

    // Update Winner
    updateWinner(gameBoard.outcome, gameBoard.winner);

    // Make the outcome call
    overAlert = "It's over.\n" + gameBoard.winner + ' ' + gameBoard.outcome; 
    alert(overAlert);
}

// Creating the Player objects
const playerOne = playerFactory('Player 1','human', 0,'x');
const playerTwo = playerFactory('Player 2','bot', 0,'o');

// Looping through and adding the eventListeners to the grid
gridArr = document.getElementsByClassName('grid');
for (i=0; i<(gridArr.length); i++) {
    grid = gridArr[i];
    grid.addEventListener('click', playerOne.markGrid.bind(this,grid,i));
}
  
console.log('-------')