function Gameboard() {
    const board = []

    for (let i = 0; i < 9; i++) {
        board.push(Square());
    }

    const getBoard = () => {
        let boardVisualize = [];
        for (let i = 0; i < 9; i++) {
            boardVisualize.push(board[i].getValue());
        }
        return boardVisualize;
    };

    const squareChecker = (marker, square) => {
        if (board[square].getValue() !== 0) {
            return false
        }
        board[square].changeValue(marker);
    }

    const gameWon = () => {
        if (board[0].getValue() === board[3].getValue() && board[3].getValue() === board[6].getValue() && board[0].getValue() !== 0 || board[1].getValue() === board[4].getValue() && board[4].getValue() === board[7].getValue() && board[1].getValue() !== 0 || board[2].getValue() === board[5].getValue() && board[5].getValue() === board[8].getValue() && board[2].getValue() !== 0 ||
        board[0].getValue() === board[1].getValue() && board[1].getValue() === board[2].getValue() && board[0].getValue() !== 0 || board[3].getValue() === board[4].getValue() && board[4].getValue() === board[5].getValue() && board[3].getValue() !== 0 || board[6].getValue() === board[7].getValue() && board[7].getValue() === board[8].getValue() && board[6].getValue() !== 0 ||
        board[0].getValue() === board[4].getValue() && board[4].getValue() === board[8].getValue() && board[0].getValue() !== 0 || board[6].getValue() === board[4].getValue() && board[4].getValue() === board[2].getValue() && board[6].getValue() !== 0) {
            return true;
        } else {
            return false;
        }
    }

    const gameTie = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === 0) {
                return false;
            }
        } return true;
    }

    return { getBoard, squareChecker, gameWon, gameTie };
}

function Square() {
    let value = 0;
    const getValue = () => value;

    const changeValue = (mark) => {
        value = mark;
    }

    return { getValue, changeValue };
}

function Players() {

    const createPlayers = (playerOneName, playerTwoName) => [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    const setPlayersName = () => {
        const buttonForm = document.querySelector("#players-button");
        buttonForm.addEventListener("click", () => {
            const player1 = player1name.value ? player1name.value : "Player 1";
            const player2 = player2name.value ? player2name.value : "Player 2";
            const initializedPlayers = createPlayers(player1, player2);
            console.log(initializedPlayers);
            DisplayGame(initializedPlayers);
        })
    }

    setPlayersName();
}

function GameController(players) {

    const board = Gameboard();

    let turn = 1;
    const changeTurn = () => {
        turn = turn === 1 ? 2 : 1;
        console.log(turn);
    }

    const getTurn = () => turn;

    const playRound = (choice) => {
         const actualPlayer = getTurn();

         if (board.squareChecker(players[actualPlayer - 1].marker, choice) === false) {
            return false;
         }

         if (board.gameWon() === true) {
            console.log(`${players[actualPlayer - 1].name} won!`);
         } else if (board.gameTie() === true) {
            console.log("The game is a tie!");
         } else {
            changeTurn();
            console.log(board.getBoard());
         }
    }

    return { getTurn, changeTurn, playRound, getBoard: board.getBoard};
}

function DisplayGame(players) {

    const game = GameController(players);

    const gameboardUI = document.querySelector("#gameboard");

    const printGameboard = () => {
        gameboardUI.textContent = '';
        const gameboard = game.getBoard();
        let count = 0;
        gameboard.forEach((square) => {
            const actualCount = count;
            const squareUI = document.createElement("div");
            squareUI.setAttribute("class", "square");
            squareUI.setAttribute("id", `${actualCount}`);
            squareUI.textContent = square;
            squareUI.addEventListener("click", () => {
                game.playRound(actualCount);
                printGameboard();
            });
            gameboardUI.append(squareUI);
            count++;
        })
    }

    printGameboard();

    return { printGameboard };
}

const setPlayers = Players();