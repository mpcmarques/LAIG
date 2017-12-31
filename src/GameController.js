/**
 * Created by mateuspedroza on 31/12/17.
 */

function GameController(scene) {
    if (scene == null)
        console.warn('Error: Wrong inputs.');

    this.gameModel = new GameModel();
    this.fabrik = new Fabrik();
    this.scene = scene;
    this.gameView = new MyBoard(this.scene);
}

GameController.prototype.constructor = GameController;

GameController.prototype.startGame = function(){
    var self = this;

    // get initial board.
    this.fabrik.getInitialBoard(function (board){

        // update board
        self.updateBoard(board);

        // make first play
        self.makeFirstPlay(function (){

            // game loop



        });

    });

};

GameController.prototype.updateBoard = function(board){
    console.log('GameController: Updated board', board);

    this.gameModel.updateBoard(board);
    this.gameView.updateBoard(board);
};

GameController.prototype.makeFirstPlay = function(onFinished){

    switch (this.gameModel.selectedMode){
        case GameModes.PLAYER_VS_PLAYER:
            this.makeFirstPlayPlayerVsPlayer(onFinished);
            break;
        case GameModes.PLAYER_VS_COMPUTER:
            this.makeFirstPlayPlayerVsComputer(onFinished);
            break;
        case GameModes.COMPUTER_VS_COMPUTER:
            this.makeFirstPlayComputerVsComputer(onFinished);
            break;
    }

};

GameController.prototype.makeFirstPlayPlayerVsPlayer = function(onFinish){
    var self = this;

    // Player select worker to move
    var player1SelectedWorkerPiece;

    // Player select place to move worker
    var player1SelectedPlayerPosition;

    // 1o jogador move trabalhador
    this.playerMoveWorker(player1SelectedWorkerPiece, player1SelectedPlayerPosition, function(board){
        // update board
        self.updateBoard(board);

        // 2o select other worker to move
        var player2SelectedWorkerPiece;

        // Player select place to move worker
        var player2SelectedPlayerPosition;

        // 2o jogador move trabalhador
        self.playerMoveWorker(player2SelectedWorkerPiece, player2SelectedPlayerPosition, function(board2){

            // update board
            self.updateBoard(board2);

            // finished turn
            onFinish();
        });
    });
};

// RETORNA UMA BOARD APOS O PLAYER MOVIMENTAR TRABALHADOR.
GameController.prototype.playerMoveWorker = function(workerPiece, position, callback){

    // Player move worker
    this.fabrik.movePiece(
        this.gameModel.getBoard(),
        workerPiece,
        position.x,
        position.z,
        function (board){
            callback(board);
        }
    );
};