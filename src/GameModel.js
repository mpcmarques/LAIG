/**
 * Created by mateuspedroza on 31/12/17.
 */

var GameModes = {PLAYER_VS_PLAYER: 0, COMPUTER_VS_COMPUTER: 1, PLAYER_VS_COMPUTER: 2};
var GamePieces = {WORKER1: 't1', WORKER2: 't2', WHITE: 'b', BLACK: 'p'};

function GameModel (mode) {
    this.board = null;
    this.states = {STARTED: 0, MADE_FIRST_PLAY: 1, GAME_LOOP: 2, OVER: 3};
    this.selectedMode = mode;
}

GameModel.prototype.constructor = GameModel;

GameModel.prototype.getBoard = function (){
    return this.board.slice();
};

GameModel.prototype.updateBoard = function (newBoard){
    // TODO: validar board a ser substituida.
    if (newBoard != null && newBoard != [])
        this.board = newBoard;
};