// Get the board and status element
const boardElem = document.querySelectorAll('li');
const statusElem = document.querySelector('.status');

// Attach click listener for each pane
// Detection of illegal clicks and tie events is handled here.
boardElem.forEach((pane) => {
    pane.addEventListener('click', (e) => {
        if (board.gameboard[e.target.id] == "" && !(board.locked)){ 
            board.numPlays += 1;
            if (board.numPlays == 9){ //Tie game lock out
                board.locked = true;
                statusElem.textContent = "TIE GAME";
            } else if (board.curPlayer === 1){
                statusElem.textContent = "Player O's turn";
                P1.markBoard(e.target.id);
            } else {
                statusElem.textContent = "Player X's turn";
                P2.markBoard(e.target.id);   
            }
        }
    });
});

//Restart button
const restartButton = document.getElementById('restartBtn');
restartButton.addEventListener('click', () =>{
    board.reset();
    board.locked = false;
});

// Board object (Module pattern). This is a IIFE. It is called imediately
const board = (() => {
    let gameboard = ["","","",   "","","",   "","",""];
    let curPlayer = 1;
    let locked = false;
    let numPlays = 0;

    const updateDisplay = () => {
        for (let i=0; i<gameboard.length; i++){
            const pane = document.getElementById(i);
            pane.textContent = gameboard[i];
        }
    }

    const reset = () => {
        for (let i=0; i<gameboard.length; i++){
            gameboard[i] = "";
        }
        statusElem.textContent = "Player X's turn";
        board.curPlayer = 1;
        board.numPlays = 0;
        updateDisplay();
    }

    // checks neigbours of cell to see if they are of same type and thus declaring a win O(1)
    const checkForWin = (base) => {
        const marker = gameboard[base];
        base = parseInt(base);

        switch(base){
            case 0:
                if (marker == gameboard[1] && marker == gameboard[2]) return true;
                if (marker == gameboard[3] && marker == gameboard[6]) return true;
                if (marker == gameboard[4] && marker == gameboard[8]) return true;
                break;
            case 1:
                if (marker == gameboard[0] && marker == gameboard[2]) return true;
                if (marker == gameboard[4] && marker == gameboard[7]) return true;
                break;   
            case 2:
                if (marker == gameboard[0] && marker == gameboard[1]) return true;
                if (marker == gameboard[5] && marker == gameboard[8]) return true;
                if (marker == gameboard[4] && marker == gameboard[6]) return true;
                break;
            case 3:
                if (marker == gameboard[4] && marker == gameboard[5]) return true;
                if (marker == gameboard[0] && marker == gameboard[6]) return true;
                break;
            case 4:
                if (marker == gameboard[1] && marker == gameboard[7]) return true;
                if (marker == gameboard[3] && marker == gameboard[5]) return true;
                if (marker == gameboard[0] && marker == gameboard[8]) return true;
                if (marker == gameboard[2] && marker == gameboard[6]) return true;
                break;
            case 5:
                if (marker == gameboard[2] && marker == gameboard[8]) return true;
                if (marker == gameboard[3] && marker == gameboard[4]) return true;
                break;
            case 6:
                if (marker == gameboard[0] && marker == gameboard[3]) return true;
                if (marker == gameboard[7] && marker == gameboard[8]) return true;
                if (marker == gameboard[2] && marker == gameboard[4]) return true;
                break;
            case 7:
                if (marker == gameboard[1] && marker == gameboard[4]) return true;
                if (marker == gameboard[6] && marker == gameboard[8]) return true;
                break;
            case 8:
                if (marker == gameboard[2] && marker == gameboard[5]) return true;
                if (marker == gameboard[6] && marker == gameboard[7]) return true;
                if (marker == gameboard[0] && marker == gameboard[4]) return true;
                break;
            default:
                return false;
        }
    }

    return{gameboard, curPlayer, locked, numPlays, updateDisplay, reset, checkForWin};
})();

// Player factory
const Player = (playerNumber) => {
    const markBoard = (pane) =>{
        if (playerNumber === 1){
            board.gameboard[pane] = 'X';
            board.curPlayer = 2;
        } else {
            board.gameboard[pane] = 'O';
            board.curPlayer = 1;
        }
        board.updateDisplay();

        // Check if this move resulted in a win
        if (board.checkForWin(pane)){
            statusElem.textContent = "Congratulations player "+playerNumber+"! You win!";
            board.locked = true;
        }
    }
    return {markBoard};
}

const P1 = Player(1);
const P2 = Player(2);