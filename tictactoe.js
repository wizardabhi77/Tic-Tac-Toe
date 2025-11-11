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
            if(xoArray[1][1] == 'X'){
                if(xoArray[0][0] == 'X' && xoArray[2][2] == 'X') {
                    win = true;
                }
                else if (xoArray[0][2] == 'X' && xoArray[2,0] == 'X'){
                    win = true;
                }
            }
            else if(xoArray[1][1] == 'O'){
                    if(xoArray[0][0] == 'O' && xoArray[2][2] == 'O') {
                        win = true;
                    }
                    else if (xoArray[0][2] == 'O' && xoArray[2,0] == 'O'){
                        win = true;
                    }
            }
            else {
                for (i=0; i<3; i++){
                    let column = [xoArray[0][i], xoArray[1][i], xoArray[2][i]];

                    if(xoArray[i].toString() == ['X','X','X'].toString() || xoArray[i].toString() == ['O','O','O'].toString()){
                        win = true;
                        break;
                    }

                    else if( column == ['X','X','X'].toString() || column == ['O','O','O'].toString())
                    {
                        win = true;
                        break;
                    }

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
        return {name, xoSelect, playerNumber};
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
            console.log('Game Finish');
            winGame = true;
        }
        return {score, round, winGame, winRound, finishGame};
    }();


   /* while(!game.winGame) {
        playerTurn++;
        let position = Number(window.prompt('Enter your X position:').split(',')));
        let currentPlayer = playerTurn%2 == 0 ? player2 : player1;

        gameboard.setXO([position[0], position[1]], currentPlayer);

        if(gameboard.winCheck()) {
            game.winRound(currentPlayer);
            game.finishGame();
        }
    } */
    
}

playGame();
