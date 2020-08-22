const size = prompt("Size of Tic-Tac-Toe Board", 3);
const board = new Array(size);
let moves = size*size;

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
        for(let j = 0; j < size;j++){
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
    while(gameIsWon() === false || moves !== 0) {
        let position = prompt("Enter the row and index of : " + currentPlayer);

        try {
            if(isInvalidPosition(position) === false) {
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

        if(gameIsWon() === true) {
            console.log("Game is Won by Player " + currentPlayer + " !");
            break;
        }
        currentPlayer = findNextPlayer(currentPlayer);

        if(boardIsFull() && gameIsWon() === false) {
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
        firstBoardELement = boardRow[0];
        nextPlayer = findNextPlayer(firstBoardELement);
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
        firstBoardELement = board[0][i];
        nextPlayer = findNextPlayer(firstBoardELement);
        column = arrayColumn(board, i);
        if(column.toString().indexOf("-") === -1 && column.toString().indexOf(nextPlayer) === -1) {
            return true;
        }
    }
    return false;
}

function isLeftDiagonalMatched()
{
    let leftDiagonal = "";
    const arrayLeftDiagonal = (matrix, rowIndex) => matrix[rowIndex][rowIndex];
    firstBoardELement = board[0][0];
    nextPlayer = findNextPlayer(firstBoardELement);
    for(let i = 0; i < size; i++) {
        leftDiagonal += arrayLeftDiagonal(board, i);
    }
    if(leftDiagonal.indexOf("-") === -1 && leftDiagonal.indexOf(nextPlayer) === -1) {
        return true;
    }
    return false;
}

function isRightDiagonalMatched()
{
    let rightDiagonal = "";
    const arrayRightDiagonal = (matrix, rowIndex) => matrix[rowIndex][matrix.length - 1 - rowIndex];
    firstBoardELement = board[0][size-1];
    nextPlayer = findNextPlayer(firstBoardELement);
    for(let i = 0; i < size; i++) {
            rightDiagonal += arrayRightDiagonal(board, i);
    }
    if(rightDiagonal.indexOf("-") === -1 && rightDiagonal.indexOf(nextPlayer) === -1) {
        return true;
    }
    return false;
}


function gameIsWon()
{
    let firstBoardELement;
    let nextPlayer;
    
    if(isRowMatched() === true || isColumnMatched() === true || isLeftDiagonalMatched() === true || 
        isRightDiagonalMatched() === true) {
        return true;
    }
    return false;
}

createBoard();
showBoard();
playGame();