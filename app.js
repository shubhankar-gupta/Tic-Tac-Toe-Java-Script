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
    while(!gameIsWon() || moves) {
        let position = prompt("Enter the row and index of : " + currentPlayer);

        if(isInvalidPosition(position) === false) {
            board[parseInt(position[0])][parseInt(position[1])] = currentPlayer;
            moves--;
        } else {
            console.log("Board Position is occupied");
            moves++;
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

function isDiagonalMatched(side)
{
    let diagonal = "";
    firstBoardElement = side === "left" ? board[0][0] : board[0][size - 1];
    nextPlayer = findNextPlayer(firstBoardELement);
    for(let i = 0; i < size; i++) {
        diagonal += side === "left" ? board[i][i] : board[i][size - 1 - i];
    }
    if(diagonal.indexOf("-") === -1 && diagonal.indexOf(nextPlayer) === -1) {
        return true;
    }
    return false;
}

function gameIsWon()
{
    let firstBoardELement;
    let nextPlayer;
    let row;
    
    if(isRowMatched() || isColumnMatched() || isDiagonalMatched("left") || isDiagonalMatched("right")) {
        return true;
    }

    return false;
}

createBoard();
showBoard();
playGame();
