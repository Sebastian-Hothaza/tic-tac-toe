// Get the board and status element
const boardElem = document.querySelectorAll('li');
const statusElem = document.querySelector('.status');

// Attach click listener for each pane
// Detection of illegal clicks is handled here.
boardElem.forEach((pane) => {
    pane.addEventListener('click', (e) => {
        if (board.gameboard[e.target.id] == ""){ 
            if (board.curPlayer === 1){
                P1.markBoard(e.target.id);
                statusElem.textContent = "Player O's turn";
            } else {
                P2.markBoard(e.target.id);
                statusElem.textContent = "Player X's turn";
            }
        }
    });
});

//Restart button
const restartButton = document.getElementById('restartBtn');
restartButton.addEventListener('click', () =>{
    board.reset();
    statusElem.textContent = "Player X's turn";
});

// Board object (Module pattern). This is a IIFE. It is called imediately
const board = (() => {
    let gameboard = ["","","",   "","","",   "","",""];
    let curPlayer = 1;

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
        board.curPlayer = 1;
        updateDisplay();
    }

    // checks neigbours of cell to see if they are of same type and thus declaring a win
    const checkForWin = (base) => {
        const marker = gameboard[base];

        // Check vertical
        if ((gameboard[base+3] == marker) && (gameboard[base+6] == marker) ||
            (gameboard[base-3] == marker) && (gameboard[base-6] == marker) ||
            (gameboard[base+3] == marker) && (gameboard[base-3] == marker)){
                return true;
        }

        // Check horizontal
        if ((gameboard[base+1] == marker) && (gameboard[base+2] == marker) ||
            (gameboard[base-1] == marker) && (gameboard[base-2] == marker) ||
            (gameboard[base+1] == marker) && (gameboard[base-1] == marker)){
                return true;
        }

        // Check diagonal
        if ((gameboard[base+2] == marker) && (gameboard[base+4] == marker) ||
            (gameboard[base-2] == marker) && (gameboard[base-4] == marker) ||
            (gameboard[base+2] == marker) && (gameboard[base-2] == marker) ||

            (gameboard[base+4] == marker) && (gameboard[base+8] == marker) ||
            (gameboard[base-4] == marker) && (gameboard[base-8] == marker) ||
            (gameboard[base+4] == marker) && (gameboard[base-4] == marker)){
                return true;
        }

        return false;
    }

    return{gameboard, curPlayer, updateDisplay, reset, checkForWin};
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
            alert("Player "+playerNumber+" Wins!");
            board.reset();
            statusElem.textContent = "Player X's turn";
            
        }


    }
    return {markBoard};
}

const P1 = Player(1);
const P2 = Player(2);