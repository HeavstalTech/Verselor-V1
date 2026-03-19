// lib/game.js

class TicTacToe {
    constructor(playerX = 'x', playerO = 'o') {
        this.playerX = playerX;
        this.playerO = playerO;
        this._currentTurn = false;
        this._x = 0;
        this._o = 0;
        this.turns = 0;
    }

    get board() { return this._x | this._o; }
    get currentTurn() { return this._currentTurn ? this.playerO : this.playerX; }
    get enemyTurn() { return this._currentTurn ? this.playerX : this.playerO; }

    static check(state) {
        for (let combo of[7, 56, 73, 84, 146, 273, 292, 448])
            if ((state & combo) === combo) return !0;
        return !1;
    }

    static toBinary(x = 0, y = 0) {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error('invalid position');
        return 1 << x + (3 * y);
    }

    turn(player = 0, x = 0, y) {
        if (this.board === 511) return -3;
        let pos = 0;
        if (y == null) {
            if (x < 0 || x > 8) return -1;
            pos = 1 << x;
        } else {
            if (x < 0 || x > 2 || y < 0 || y > 2) return -1;
            pos = TicTacToe.toBinary(x, y);
        }
        if (this._currentTurn ^ player) return -2;
        if (this.board & pos) return 0;
        this[this._currentTurn ? '_o' : '_x'] |= pos;
        this._currentTurn = !this._currentTurn;
        this.turns++;
        return 1;
    }

    static render(boardX = 0, boardO = 0) {
        let x = parseInt(boardX.toString(2), 4);
        let y = parseInt(boardO.toString(2), 4) * 2;
        return [...(x + y).toString(4).padStart(9, '0')].reverse().map((value, index) => value == 1 ? 'X' : value == 2 ? 'O' : ++index);
    }
    
    render() { return TicTacToe.render(this._x, this._o); }

    get winner() {
        let x = TicTacToe.check(this._x);
        let o = TicTacToe.check(this._o);
        return x ? this.playerX : o ? this.playerO : false;
    }
}

class WordChain {
    constructor(host) {
        this.host = host;
        this.players = [{ id: host, score: 0 }];
        this.usedWords = new Set();
        this.lastWord = null;
        this.currentIndex = 0;
        this.chainLength = 0;
        this.joinPhase = true;
        this.turnTimeout = null;
    }

    get timeLimit() {
        if (this.chainLength >= 30) return 10; // Extreme Mode
        if (this.chainLength >= 15) return 20; // Hard Mode
        return 30;                             // Normal Mode
    }

    get minWordLength() {
        if (this.chainLength >= 40) return 12;
        if (this.chainLength >= 30) return 10;
        if (this.chainLength >= 20) return 7;
        if (this.chainLength >= 10) return 5;
        return 2;
    }

    addPlayer(playerId) {
        if (this.players.some(p => p.id === playerId)) return false;
        this.players.push({ id: playerId, score: 0 });
        return true;
    }

    startGame() {
        this.joinPhase = false;
        for (let i = this.players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
        }
        return this.players[0];
    }

    get currentPlayer() {
        return this.players[this.currentIndex];
    }

    get nextPlayer() {
        return this.players[(this.currentIndex + 1) % this.players.length];
    }

    acceptWord(word) {
        this.usedWords.add(word);
        this.lastWord = word;
        this.currentPlayer.score += word.length; // Score = Length of word
        this.chainLength++;
        this.currentIndex = (this.currentIndex + 1) % this.players.length;
    }
}

module.exports = { TicTacToe, WordChain };
