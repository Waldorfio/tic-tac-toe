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
            console.log('o marked!')
        },
        markGrid(grid) {
            grid.innerHTML = marker;
            arr.splice(i, 1);
            idx = randomGridIdx(arr);
            playerTwo.botAutoMark(gridArr[idx])

            marked = marked + 1;
            if (marked==5) {itsOver()}
            return arr
        },
        
    };
}

function randomGridIdx(arr) {
    let idx = arr[Math.floor(Math.random() * arr.length)];
    return idx
}

function itsOver() {
    alert('OVER!');
    scoreOne = scoreOne + 1;
    marked = 0;
    pOneScore = document.getElementById('player-one');
    pOneScore.innerHTML = scoreOne + ' A';
}

// Creating the Player objects
const playerOne = playerFactory('p1','human',3,'x');
const playerTwo = playerFactory('p2','bot',4,'o');

// Looping through and adding the eventListeners to the grid
gridArr = document.getElementsByClassName('grid');
for (i=0; i<(gridArr.length); i++) {
    grid = gridArr[i];
    grid.addEventListener('click', playerOne.markGrid.bind(this,grid));
}
  
console.log('-------')