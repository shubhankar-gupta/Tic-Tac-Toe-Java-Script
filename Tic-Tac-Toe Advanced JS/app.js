const size = prompt("Size of Tic-Tac-Toe Board", 3);
const board = new Array(size);
let moves = size * size;

function createBoard()
{
    //defining the board
    for(let i = 0; i < size; i++) {
        board[i] = new Array(size);
    }

    //initialising the board
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            board[i][j] = "-";
        }
    }
}

function showBoard()
{
    let row;
    for(let i = 0; i < size; i++) {
        row = "";
        for(let j = 0; j < size; j++){
            row = row + board[i][j] + " ";
        }
        console.table(row);
    }
}

function isInvalidPosition(position)
{
    if(board[parseInt(position[0])][parseInt(position[1])] === "-") {
        return false;
    }
    return true;
}

function playGame()
{
    let currentPlayer = "X";
    let flagInvalidPosition = 0;
    while(!gameIsWon() || moves) {
        let position = prompt("Enter the row and index of : " + currentPlayer);

        try {
            if(!isInvalidPosition(position)) {
                board[parseInt(position[0])][parseInt(position[1])] = currentPlayer;
                moves--;
            } else {
                console.log("Board Position is occupied");
                moves++;
                currentPlayer = findNextPlayer(currentPlayer);
            }
        } catch(err) {
            console.log("Enter position within limits");
            currentPlayer = findNextPlayer(currentPlayer);
        }

        showBoard();
        console.log(`
         `);

        if(gameIsWon()) {
            console.log("Game is Won by Player " + currentPlayer + " !");
            break;
        }
        currentPlayer = findNextPlayer(currentPlayer);

        if(boardIsFull() && !gameIsWon()) {
            console.log("Game Drawn!");
            break;
        }
        
    }
}

function boardIsFull()
{
    for(let boardRow of board) {
        for(let boardElement of boardRow) {
            if(boardElement === "-") {
                return false;
            }
        }
    }
    return true;
}

function findNextPlayer(currentlyPlaying)
{
    if(currentlyPlaying === "X"){ 
        return "O";
    } 
    return "X";
}

function isRowMatched()
{
    for(let boardRow of board) {
        firstBoardElement = boardRow[0];
        nextPlayer = findNextPlayer(firstBoardElement);
        if(boardRow.toString().indexOf("-") === -1 && boardRow.toString().indexOf(nextPlayer) === -1) {
            return true;
        }
    }
    return false;
}

function isColumnMatched()
{
    let column;
    const arrayColumn = (matrix, index) => matrix.map(x => x[index]);
    for(let i = 0; i < size; i++) {
        firstBoardElement = board[0][i];
        nextPlayer = findNextPlayer(firstBoardElement);
        column = arrayColumn(board, i);
        if(column.toString().indexOf("-") === -1 && column.toString().indexOf(nextPlayer) === -1) {
            return true;
        }
    }
    return false;
}

function isDiagonalMatched(side)
{
    let firstBoardElement;
    let diagonal = "";
    const arrayLeftDiagonal = (matrix, rowIndex) => matrix[rowIndex][rowIndex];
    const arrayRightDiagonal = (matrix, rowIndex) => matrix[rowIndex][matrix.length - 1 - rowIndex];
    firstBoardElement = side === "left" ? board[0][0] : board[0][size-1];
    nextPlayer = findNextPlayer(firstBoardElement);
    for(let i = 0; i < size; i++) {
        diagonal += side === "left" ? arrayLeftDiagonal(board, i) : arrayRightDiagonal(board, i);
    }
    if(diagonal.indexOf("-") === -1 && diagonal.indexOf(nextPlayer) === -1) {
        return true;
    }
    return false;
}


function gameIsWon()
{
    let firstBoardElement;   
    if(isRowMatched() || isColumnMatched() || isDiagonalMatched("left") || isDiagonalMatched("right")) {
        return true;
    }
    return false;
}

createBoard();
showBoard();
playGame();