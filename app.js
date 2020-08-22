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

        if(isInvalidPosition(position) === false) {
            board[parseInt(position[0])][parseInt(position[1])] = currentPlayer;
            moves--;
        } else {
            console.log("Board Position is occupied");
            moves++;
            currentPlayer=findNextPlayer(currentPlayer);
        }

        showBoard();
        console.log(`
         `);

        if(gameIsWon() === true) {
            console.log("Game is Won by Player " + currentPlayer + " !");
            break;
        }
        currentPlayer=findNextPlayer(currentPlayer);

        if(boardIsFull() && gameIsWon() === false) {
            console.log("Game Drawn!");
            break;
        }
        
    }
}

function boardIsFull()
{
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if(board[i][j] === "-") {
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
    let row;
    for(let i = 0; i < size; i++) {
        row = "";
        firstBoardELement = board[i][0];
        nextPlayer = findNextPlayer(firstBoardELement);
        
        for(let j = 0;j < size; j++) {    
            row += board[i][j];    
        }
        if(row.indexOf("-") === -1 && row.indexOf(nextPlayer) === -1) {
            return true;
        }
    } 
    return false;
}

function isColumnMatched()
{
    let row;
    for(let j = 0; j < size; j++) {
        firstBoardELement = board[0][j];
        row = "";
        nextPlayer = findNextPlayer(firstBoardELement);
        
        for(let i = 0; i < size; i++) {
            row += board[i][j];
        }
        if(row.indexOf("-") === -1 && row.indexOf(nextPlayer) === -1) {
            return true;
        }
    }
    return false;
}

function isLeftDiagonalMatched()
{
    let leftDiagonal = "";
    firstBoardELement = board[0][0];
    nextPlayer = findNextPlayer(firstBoardELement);
    for(let i = 0; i < size; i++) {
        leftDiagonal += board[i][i];
    }
    if(leftDiagonal.indexOf("-") === -1 && leftDiagonal.indexOf(nextPlayer) === -1) {
        return true;
    }
    return false;
}

function isRightDiagonalMatched()
{
    let rightDiagonal = "";
    firstBoardELement = board[0][size-1];
    nextPlayer = findNextPlayer(firstBoardELement);
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if( (i+j) === (size-1)) {
                rightDiagonal += board[i][j];
            }
        }
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
    let row;
    
    if(isRowMatched() === true || isColumnMatched() === true || isLeftDiagonalMatched() === true || 
        isRightDiagonalMatched() === true) {
        return true;
    }

    return false;
}

createBoard();
showBoard();
playGame();