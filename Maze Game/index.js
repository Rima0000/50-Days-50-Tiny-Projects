const maze = [
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 0,],
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1]
];

const mazeElement = document.getElementById('maze');

function createMaze() {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[i][j] === 0) {
                cell.classList.add('wall');
            } else if (i === 0 && j === 0) {
                cell.classList.add('start');
            } else if (i === maze.length - 1 && j === maze[i].length - 1) {
                cell.classList.add('end');
            }
            mazeElement.appendChild(cell);
        }
    }
}

function movePlayer(event) {
    const key = event.key;
    let playerPosition = document.querySelector('.player');
    let [row, col] = getPlayerPosition(playerPosition);
    let newRow = row;
    let newCol = col;

    switch (key) {
        case 'ArrowUp':
            newRow = row - 1;
            break;
        case 'ArrowDown':
            newRow = row + 1;
            break;
        case 'ArrowLeft':
            newCol = col - 1;
            break;
        case 'ArrowRight':
            newCol = col + 1;
            break;
        default:
            return;
    }

    if (isValidMove(newRow, newCol)) {
        playerPosition.classList.remove('player');
        mazeElement.children[newRow * maze.length + newCol].classList.add('player');
    }

    if (newRow === maze.length - 1 && newCol === maze[newRow].length - 1) {
        alert('You won!');
        window.removeEventListener('keydown', movePlayer);
    }
}

function getPlayerPosition(playerPosition) {
    const index = Array.from(mazeElement.children).indexOf(playerPosition);
    const row = Math.floor(index / maze.length);
    const col = index % maze.length;
    return [row, col];
}

function isValidMove(row, col) {
    return row >= 0 && row < maze.length && col >= 0 && col < maze[row].length && maze[row][col] !== 0;
}

createMaze();
mazeElement.children[0].classList.add('player');
window.addEventListener('keydown', movePlayer);