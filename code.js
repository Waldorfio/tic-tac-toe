console.clear();

// The factory function to create the player object, and hold associated functions
function playerFactory(type, score, marker) {
    return {
        type: type,
        score: score,
        marker: marker,
        markGrid(grid) {
            grid.innerHTML = marker;
        }
    };
}

// Creating the Player objects
playerOne = playerFactory('p1',3,'x');
playerTwo = playerFactory('p2',4,'o')

// Looping through and adding the eventListeners to the grid
gridArr = document.getElementsByClassName('grid');
for (i=0; i<(gridArr.length); i++) {
    grid = gridArr[i];
    grid.addEventListener('click', playerOne.markGrid.bind(this,grid));
}
  
console.log('-------')