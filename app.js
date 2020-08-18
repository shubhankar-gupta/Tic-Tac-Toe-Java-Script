let size = prompt("Size of Tic-Tac-Toe Board",3);
let board = new Array(size);
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

function playGame()
{
    let currentPlayer = "X";
    let flagInvalidPosition = 0;
    while(gameIsWon() == 0 || moves != 0) {
        flagInvalidPosition = 0;
        let position=prompt("Enter the row and index of : " + currentPlayer);

        if(board[parseInt(position[0])][parseInt(position[1])] == "-") {
            board[parseInt(position[0])][parseInt(position[1])] = currentPlayer;
        } else {
            console.log("Board Position is occupied");
            flagInvalidPosition = 1;
            moves++;
        }

        showBoard();
        console.log();

        if(gameIsWon() == 1) {
            console.log("Game is Won by Player " + currentPlayer + " !");
            break;
        }

        if(flagInvalidPosition == 0) {
            moves--;
            if(currentPlayer == "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }
        }

        if(boardIsFull() && gameIsWon() == 0) {
            console.log("Game Drawn!");
            break;
        }
        
    }
}

function boardIsFull()
{
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if(board[i][j] == "-") {
                return 0;
            }
        }
    }
    return 1;
}


function gameIsWon()
{
    let firstBoardELement;
    let nextPlayer;
    let row;
    let leftDiagonal = "";
    let rightDiagonal = "";
    //checking for every row
    for(let i = 0; i < size; i++)
    {
        firstBoardELement = board[i][0];
        if(firstBoardELement == "X"){ 
            nextPlayer = "O";
        } else {
            nextPlayer = "X";
        }
        row = "";
        for(let j = 0;j < size; j++) {    
            row += board[i][j];    
        }
        if(row.indexOf("-") == -1 && row.indexOf(nextPlayer) == -1) {
            return 1;
        }
    } 

    //checking for every column
    for(let j = 0; j < size; j++) {
        firstBoardELement = board[0][j];
        if(firstBoardELement == "X") {
            nextPlayer = "O";
        }
        else {
            nextPlayer = "X";
        }
        row = "";
        for(let i = 0; i < size; i++) {
            row += board[i][j];
        }
        if(row.indexOf("-") == -1 && row.indexOf(nextPlayer) == -1) {
            return 1;
        }
    }

    //checking for left diagonal
    
    firstBoardELement = board[0][0];
    if(firstBoardELement == "X") {
        nextPlayer = "O";
    } else {
        nextPlayer = "X";
    }

    for(let i = 0; i < size; i++) {   
        for(let j = 0; j < size; j++) {
            if(i == j) {
                leftDiagonal += board[i][j];
            }
        }
    }
    if(leftDiagonal.indexOf("-") == -1 && leftDiagonal.indexOf(nextPlayer) == -1) {
        return 1;
    }

    //checking for right diagonal
    firstBoardELement = board[0][size-1];
    if(firstBoardELement == "X") {
        nextPlayer = "O";
    } else {
        nextPlayer = "X";
    }
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if( (i+j) == (size-1)) {
                rightDiagonal += board[i][j];
            }
        }
    }
    if(rightDiagonal.indexOf("-") == -1 && rightDiagonal.indexOf(nextPlayer) == -1) {
        return 1;
    }
    return 0;
}

createBoard();
showBoard();
playGame();