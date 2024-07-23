const diceButtonElement = document.querySelector('#dice-btn');

const allPlayerPieces = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'),
    P2: document.querySelectorAll('[player-id="P2"].player-piece'),
}
const oneStepDistense = 6.66;
const players = ['P1', 'P2'];
//path of the pieces
const MOVE_POSITION_POINTS = {
    0: [6.92, 12.28], 1: [6.92, 11.32], 2: [6.92, 10.4], 3: [6.92, 9.49], 4: [6.92, 8.56], 5: [6.48, 7.65], 6: [6.05, 7.65], 7: [5.62, 7.65], 8: [5.18, 7.65], 9: [4.74, 7.65], 10: [4.3, 7.65], 11: [4.3, 6.7], 12: [4.3, 5.9], 13: [4.74, 5.9], 14: [5.18, 5.9], 15: [5.62, 5.9], 16: [6.05, 5.9], 17: [6.48, 5.9], 18: [6.92, 4.85], 19: [6.92, 3.92], 20: [6.92, 3], 21: [6.92, 2.1], 22: [6.92, 1.2], 23: [6.92, 0.3], 24: [7.37, 0.3], 25: [7.8, 0.3], 26: [7.8, 1.2], 27: [7.8, 2.1], 28: [7.8, 3], 29: [7.8, 3.92], 30: [7.8, 4.88], 31: [8.24, 5.8], 32: [8.67, 5.8], 33: [9.11, 5.8], 34: [9.55, 5.8], 35: [9.98, 5.8], 36: [10.43, 5.8], 37: [10.43, 6.75], 38: [10.43, 7.6], 39: [9.98, 7.7], 40: [9.55, 7.7], 41: [9.11, 7.7], 42: [8.67, 7.7], 43: [8.26, 7.7], 44: [7.8, 8.6], 45: [7.8, 9.5], 46: [7.8, 10.4], 47: [7.8, 11.4], 48: [7.8, 12.2], 49: [7.8, 13.2], 50: [7.36, 13.2], 51: [6.92, 13.2],
    //Player 1 Home Entrance
    100: [7.37, 12.28], 101: [7.37, 11.32], 102: [7.37, 10.4], 103: [7.37, 9.45], 104: [7.37, 8.56], 105: [7.37, 7.5],
    //Player 2 Home Entrance
    200: [7.36, 1.2], 201: [7.37, 2.1], 202: [7.37, 3], 203: [7.37, 3.9], 204: [7.37, 4.9], 205: [7.37, 6],
    //Base Pose
    //Player 1
    500: [4.94, 9.94], 501: [5.8, 9.94], 502: [4.94, 11.75], 503: [5.8, 11.75],

    //Player 2
    600: [8.877, 1.62], 601: [9.722, 1.62], 602: [8.877, 3.44], 603: [9.73, 3.44],
}

// Define Positions

const base_position = {
    P2: [500, 501, 502, 503],
    P1: [600, 601, 602, 603]
}

const startingPoint = {
    P2: 0,
    P1: 26
}

const home_entrance = {
    P2: [100, 101, 102, 103, 104],
    P1: [200, 201, 202, 203, 204]
}

const home_position = {
    P2: 105,
    P1: 205
}

const turning_point = {
    P2: 50,
    P1: 24
}

const safe_points = [0, 8, 13, 21, 26, 34, 39, 47];

const stateOfDice = {
    dice_not_rolled: "Dice Not Rolled",
    dice_rolled: "Dice Rolled",
}

// class of the functions 

class ludoFunction {

    static whenDiceClick(callback) {
        diceButtonElement.addEventListener('click', callback);
    }
    static whenResetClick(callback) {
        document.querySelector('button#reset-btn').addEventListener("click", callback);
    }
    static whenPieceClick(callback) {
        document.querySelector('.player-pieces').addEventListener("click", callback);
    }

    /**
     * 
     * @param {string} player 
     * @param {Number} piece 
     * @param {Number} newPositionOfThePiece 
     */
    // set piece position function
    static setPositionOfPiece(player, piece, newPositionOfThePiece) {
        if (!allPlayerPieces[player] || !allPlayerPieces[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not found.`)
            return;
        }

        const [x, y] = MOVE_POSITION_POINTS[newPositionOfThePiece];

        const pieceElement = allPlayerPieces[player][piece];
        pieceElement.style.top = y * oneStepDistense + '%';
        pieceElement.style.left = x * oneStepDistense + '%';
    }
    // set turn function to set turn of the player
    static setTurnOfThePlayer(index) {
        if (index < 0 || index >= players.lenght) {
            console.error('index out of bound!');
            return;
        }
        const player = players[index];
        document.querySelector('.active-player span').innerText = player;
        const activePlayerBase = document.querySelector('.player-base.highlight');
        if (activePlayerBase) {
            activePlayerBase.classList.remove('highlight');
        }
        document.querySelector(`[player-id="${player}"].player-base`).classList.add('highlight');
    }

    // to enable and disable Dice
    
    static enableDice() {
        diceButtonElement.removeAttribute('disabled');
    }
    static disableDice() {
        diceButtonElement.setAttribute('disabled', '');
    }

    // to highlight and unhighlight pieces

    /**
     * 
     * @param {string} player 
     * @param {Number[]} pieces 
     */
    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = allPlayerPieces[player][piece];
            pieceElement.classList.add('highlight');
        });
    }
    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        })
    }

    // set dice value

    static setDiceValue(value) {
        document.querySelector('.dice-value').innerText = value;
    }
}


class lodo {
    currentPositionsOfThePlayer = {
        P1: [],
        P2: []
    }
    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
    set diceValue(value) {
        this._diceValue = value;

        ludoFunction.setDiceValue(value);
    }
    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;

        ludoFunction.setTurnOfThePlayer(value);
    }
    _state;
    get stateOfDice() {
        return this._state;
    }
    set stateOfDice(value) {
        this._state = value;
        if (value === stateOfDice.dice_not_rolled) {
            ludoFunction.enableDice();
            ludoFunction.unhighlightPieces();
        }
        else {
            ludoFunction.disableDice();
        }
    }
    // ************************** //
    whenDiceClick() {
        ludoFunction.whenDiceClick(this.onDiceClick.bind(this));
    }
    onDiceClick() {
        console.log('dice was clicked!');
        this.diceValue = 1 + Math.floor(Math.random() * 6);
        this.stateOfDice = stateOfDice.dice_rolled;

        this.eligiblePiecesToRun();
    }
    // ************************** //
    eligiblePiecesToRun() {
        const player = players[this.turn];

        const eligiblePieces = this.getEligiblePieces(player);
        if (eligiblePieces.length) {
            ludoFunction.highlightPieces(player, eligiblePieces);
        }
        else {
            this.incrementTurnOfThePlayer();
        }
    }
    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositionsOfThePlayer[player][piece];

            if (currentPosition === home_position[player]) {
                return false;
            }
            if (
                base_position[player].includes(currentPosition)
                && this.diceValue !== 6
            ) {
                return false;
            }
            if (
                home_entrance[player].includes(currentPosition)
                && this.diceValue > home_position[player] - currentPosition
            ) {
                return false;
            }
            return true;
        });
    }
    whenPieceClick() {
        ludoFunction.whenPieceClick(this.onPieceClick.bind(this));
    }
    onPieceClick(event) {
        const target = event.target;
        if (!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }
        console.log('piece clicked');
        const player = target.getAttribute('player-id');
        const piece = target.getAttribute('piece');
        this.handlePieceClick(player, piece);
    }
    handlePieceClick(player, piece) {
        console.log(player, piece);
        const currentPosition = this.currentPositionsOfThePlayer[player][piece];

        if (base_position[player].includes(currentPosition)) {
            this.setPositionOfPiece(player, piece, startingPoint[player]);
            this.stateOfDice = stateOfDice.dice_not_rolled;
            return;
        }
        ludoFunction.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }
    setPositionOfPiece(player, piece, newPositionOfThePiece) {
        this.currentPositionsOfThePlayer[player][piece] = newPositionOfThePiece;
        ludoFunction.setPositionOfPiece(player, piece, newPositionOfThePiece);
    }
    movePiece(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                if (this.hasPlayerWon(player)) {
                    alert(`Player : ${player} has won!`);
                    this.resetGame();
                    return;
                }
                let iskill = this.whenPieceWillBeKilled(player, piece);

                if (iskill || this.diceValue === 6) {
                    this.stateOfDice = stateOfDice.dice_not_rolled;
                    return;
                }
                this.incrementTurnOfThePlayer();
            }
        }, 200);
    }
    whenPieceWillBeKilled(player, piece) {
        const currentPosition = this.currentPositionsOfThePlayer[player][piece];
        const opponent = player === 'P1' ? 'P2' : 'P1';

        let kill = false;

        [0, 1, 2, 3].forEach(piece => {
            const opponentPosition = this.currentPositionsOfThePlayer[opponent][piece];

            if (currentPosition === opponentPosition && !safe_points.includes(currentPosition)) {
                this.setPositionOfPiece(opponent, piece, base_position[opponent][piece]);
                kill = true;
            }
        });
        return kill;
    }
    // ************************** //
    incrementTurnOfThePlayer() {
        this.turn = this.turn === 0 ? 1 : 0;
        this.stateOfDice = stateOfDice.dice_not_rolled;
    }
    // ************************** //
    incrementPiecePosition(player, piece) {

        this.setPositionOfPiece(player, piece, this.getIncrementedPosition(player, piece));
    }
    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositionsOfThePlayer[player][piece];

        if (currentPosition === turning_point[player]) {
            return home_entrance[player][0];
        }
        else if (currentPosition === 51) {
            return 0;
        }
        else {
            return currentPosition + 1;
        }
    }
    // ************************** //
    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositionsOfThePlayer[player][piece] === home_position[player]);
    }
    // ************************** //
    whenResetClick() {
        ludoFunction.whenResetClick(this.resetGame.bind(this));

    }
    resetGame() {
        console.log('reset game');
        this.currentPositionsOfThePlayer = structuredClone(base_position);

        players.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPositionOfPiece(player, piece, this.currentPositionsOfThePlayer[player][piece]);
            })
        });

        this.turn = 0;
        this.stateOfDice = stateOfDice.dice_not_rolled;
    }
    // ************************** //
    constructor() {
        this.whenDiceClick();
        this.whenResetClick();
        this.whenPieceClick();
        this.resetGame();
    }
}
const myLodo = new lodo();