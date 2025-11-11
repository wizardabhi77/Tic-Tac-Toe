function playGame () {
    
    
    const gameboard = function () {
        let xoArray = [[null,null,null],[null,null,null],[null,null,null]];
        
        const setXO = (currentPosition, player) => {
            let xoInput = player.xoSelect;
            let [row, column]  = currentPosition;
            xoArray[row][column] = xoInput;
        }
        
        const winCheck = function () {
            let win = false;
            countX = 0;
            countO = 0;
            
            for (i=0; i<3; i++){
                if(xoArray[i] == ['X','X','X'] || xoArray[i] == ['O','O','O']){
                    win = true;
                    break;
                }
            }


            return win;

        }

        const displayGameboard = () => {
            console.log(xoArray);
        }
        return {xoArray,setXO, displayGameboard,winCheck};
    }();

    
    
    function createPlayer (name, xoSelect) {
        let playerNumber = xoSelect === 'X' ? 0 : 1;
        let win = false;
        return {name, xoSelect, playerNumber, win};
    }

    
    
    const game = function () {
        let score = [null, null];
        let round = 0;
        let winGame = false;
        const winRound = (player) => {
            
            score[player.playerNumber] += 1;
            round++;
        }

        const finishGame = () => {
            winGame = true;
        }
        return {score, round, winGame, winRound, finishGame};
    }();

    let player1Name = window.prompt('Enter your Name:');
    let player1XO = window.prompt('Enter X/O :');
    let player2Name = window.prompt('Enter your Name:');
    let player2XO = window.prompt('Enter X/O :');
    let playerTurn = 0;

   let player1 = createPlayer(player1Name, player1XO);
   let player2 = createPlayer(player2Name, player2XO);

    while(!game.winGame) {
        playerTurn++;
        let positionI = Number(window.prompt('Enter your X position:'));
        let positionJ = Number(window.prompt('Enter your Y position:'));
        let currentPlayer = playerTurn%2 == 0 ? player2 : player1;

        gameboard.setXO([positionI, positionJ], currentPlayer);

        if(gameboard.winCheck()) {
            game.winRound(currentPlayer);
            game.finishGame();
        }
    }
    
    gameboard.displayGameboard();
}

playGame();
