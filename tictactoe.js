function playGame () {
    
    let startButton = document.querySelector('.start');
    let playerTurn = 1;
    let player1 = createPlayer('#player1');
    let player2 = createPlayer('#player2');
    
    const gameboard = function () {
        let xoArray = [[null,null,null],[null,null,null],[null,null,null]];
        
        const tiles = document.querySelectorAll('.tile');
        
        
        tiles.forEach(getTilesArray);
        
        
        function getTilesArray(tile,index) {
        
            if(index < 3) {
                tile.setAttribute('index','0'+index%3);
                
            }
            else if(index >= 3 && index < 6) {
                tile.setAttribute('index','1'+index%3);
                
            }
            else {
                tile.setAttribute('index','2'+index%3);
               
            }
        }

        const setXO = (e) => {
            
            let currPlayer = playerTurn%2 == 0? player2: player1;
            let xoInput = currPlayer.xoSelect;
            let currentPosition = e.target.getAttribute('index');
            let mark = document.createElement('img');
            

            if(xoInput == 'X'){
                mark.setAttribute('src','./Assets/skull-scan.svg');
            }
            else if(xoInput == 'O') {
                mark.setAttribute('src','./Assets/heart-circle-outline.svg');
            }

            e.target.appendChild(mark);
            let [row, column]  = currentPosition;
            xoArray[row][column] = xoInput;
            console.log(xoArray);
            if(playerTurn >= 9)
            {
                game.finishGame();
            }
            else if(playerTurn >= 5 && winCheck()) {
            
                console.log('You Win! STOP');
                game.winRound(currPlayer);
            }
            
            playerTurn++;
        }
        
        tiles.forEach((tile) => { tile.addEventListener('click',setXO); });

        const winCheck = function () {
            
            let win = false;
            
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
                else if (xoArray[0][2] == 'O' && xoArray[2][0] == 'O'){
                        win = true;
                    }
            } 
            
            
                
            for (i=0; i<3; i++){
                    
                let column = [xoArray[0][i], xoArray[1][i], xoArray[2][i]].toString();

                    
                if(xoArray[i].toString() == ['X','X','X'].toString() || xoArray[i].toString() == ['O','O','O'].toString()){
                        
                    win = true;
                        
                    break;
                    
                }

                    
                else if( column == ['X','X','X'].toString() || column == ['O','O','O'].toString()){
                    win = true;
                    break;
                }

                }

        return win;

        }

        const displayGameboard = () => {
            console.log(xoArray);
        }
        return {xoArray,tiles,setXO, displayGameboard,winCheck};
    }();

    
    
    function createPlayer (id) {
        let player = document.querySelector(id);
        let name = player.value;
        let xoSelect = (id === '#player1' ? 'X' : 'O');
        let playerNumber = xoSelect === 'X' ? 0 : 1;
        return {name, xoSelect, playerNumber};
    }

    
    
    const game = function () {
        let score = [0,0];
        let round = 0;
        let winGame = false;
        const scoreBoard = () => {

            let player1Score = document.querySelector('.onescore');
            let player2Score = document.querySelector('.twoscore');
            player1Score.innerHTML = `<em>${player1.name}</em><br><img src="./Assets/skull-scan.svg"><br>SCORE:${score[0]}`;
            player2Score.innerHTML = `<em>${player2.name}</em><br><img src="./Assets/heart-circle-outline.svg"><br>SCORE:${score[1]}`;
        }


        const winRound = (player) => {
            
            score[player.playerNumber] += 1;
            round++;
            scoreBoard();
            gameboard.tiles.forEach((tile) => tile.replaceChildren());
            gameboard.xoArray = [[null,null,null],[null,null,null],[null,null,null]];
            playerTurn = 1;
            if(score[0] >= 5 || score[1] >= 5){
                finishGame();
            }
        }

        const finishGame = () => {
            console.log('Game Finish');
            gameboard.tiles.forEach((tile) => tile.innerHTML = 'GAME FINISH');
            let restartButton = document.createElement('button');
            document.querySelector('.scoreboard').appendChild(restartButton);
            winGame = true;
        }
        return {score, round, winGame, scoreBoard, winRound, finishGame};
    }();

    
    startButton.addEventListener('click', () => {
        player1 = createPlayer('#player1');
        player2 = createPlayer('#player2');
        let board = document.querySelector('.scoreboard');
        let names = document.querySelector('.name');
        game.scoreBoard();
        board.removeChild(names);
    })
    

        
    
}

playGame();
