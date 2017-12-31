function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    // point
    this.point = new MyPoint(scene);

    /*
     var t1 = new MyPieceWorker(this.scene,'t1',new Position(-1,1,0));
     var t2 = new MyPieceWorker(this.scene,'t2',new Position(-1,1,0));

     this.lastBoard = null;
     this.currentBoard = null;

     this.auxblack = new MyPiecePlayer(this.scene, -2, new Position(0, 1, 0));
     this.auxwhite = new MyPiecePlayer(this.scene, -2, new Position(0, 1, 0));

     this.blackStartPos = new Position(-2, 1, 0);
     this.whiteStartPos = new Position(-2, 1, 1);

     this.positions = [];

     for (var i=0; i<11 ;i++) {
     this.positions[i]= [];
     for (var j=0;j<11;j++) {
     this.positions[i][j]= new Position(i,0,j);
     }
     }
     */
    // grid pieces
    this.pieces = [];

    // pieces start position
    this.pieceStartPosition = new Position(-2,1,-2);

    // create workers
    var t1 = new MyPieceWorker(this.scene, 't1', new Position(-1, 0, 0));
    var t2 = new MyPieceWorker(this.scene, 't2', new Position(-1, 0, 1));
    this.pieces.push(t1);
    this.pieces.push(t2);

    this.currentBoard = null;
    this.lastBoard = null;

    this.positions = [];
    for (var i = 0; i < 11; i++) {
        this.positions[i] = [];
        for (var j = 0; j < 11; j++) {
            this.positions[i][j] = new Position(i, 0, j);
        }
    }
}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {


    this.scene.pushMatrix();
    this.scene.translate(-5, 0, -5);

    // shows grid.
    this.displayGrid();

    // show pieces.
    this.displayPieces();

    this.scene.popMatrix();
};

MyBoard.prototype.displayGrid = function () {

    var count = 1;
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            this.scene.pushMatrix();

            var pos = this.positions[i][j];

            this.scene.translate(pos.x, pos.y, pos.z);

            this.scene.registerForPick(count, this.point);
            this.point.display();
            count++;

            this.scene.popMatrix();
        }
    }
};

MyBoard.prototype.displayPieces = function () {

    var count = 1001;
    for (var i = 0; i < this.pieces.length; i++) {
        this.scene.pushMatrix();

        var piece = this.pieces[i];

        this.scene.translate(piece.position.x, piece.position.y, piece.position.z);

        this.scene.registerForPick(count, piece);
        piece.display();
        count++;

        this.scene.popMatrix();
    }
};

MyBoard.prototype.updateBoard = function (board) {
    this.lastBoard = this.currentBoard;
    this.currentBoard = board;
    var posAnt = null;
    var posCurr = null;
    var piece1;


    this.actual = new Position(0, 0, 0);

    if (this.lastBoard != null) {
        for (var i = 0; i < this.lastBoard.length; i++) {
            for (var j = 0; j < this.lastBoard[i].length; j++) {
                if (this.lastBoard[i][j] != this.currentBoard[i][j]) {

                    // usar find para ver a pos actual e ant
                    var currentPiece = this.currentBoard[i][j];
                    var lastPiece = this.lastBoard[i][j];

                    var posTab = this.findPiece(this.currentBoard, currentPiece);
                    var lastTabPos = this.findPiece(this.lastBoard, currentPiece);

                    var piecePrimitive, lastPos, newPos;

                    console.log(posTab, lastTabPos);

                    // caso da peca nao ter sido colocado no tabuleiro.
                    if (posTab != null && lastTabPos == null) {

                        piecePrimitive = this.parsePiece(currentPiece);

                        if (piecePrimitive != null) {

                            lastPos = piecePrimitive.startPos;

                            newPos = this.positions[i][j];

                            this.animatePiece(piecePrimitive, lastPos, newPos);


                        }

                    }

                    // caso da peca ja existir no tabuleiro
                    else if (posTab != null && lastTabPos != null) {

                        piecePrimitive = this.parsePiece(currentPiece);

                        if (piecePrimitive != null) {

                            lastPos = this.positions[lastTabPos.x][lastTabPos.z];

                            newPos = this.positions[i][j];

                            this.animatePiece(piecePrimitive, lastPos, newPos);
                        }

                    }

                    // caso da peca ser removida do tabuleiro
                    else if (posTab == null && lastTabPos != null) {

                        piecePrimitive = this.parsePiece(lastPiece);

                        if (piecePrimitive != null) {

                            lastPos = this.positions[i][j];

                            newPos = piecePrimitive.startPos;

                            this.animatePiece(piecePrimitive, lastPos, newPos);
                        }

                    }

                }
            }
        }
    }
};

MyBoard.prototype.animatePiece = function (piece, lastPos, newPos) {
    var point2 = new Position(lastPos.x, lastPos.y + 5, lastPos.z);
    var point3 = new Position(newPos.x, newPos.y + 5, newPos.z);

    if (piece instanceof MyPiecePlayer){
        lastPos = this.pieceStartPosition;
    }

    var controlPoints = [lastPos, point2, point3, newPos];

    piece.animation = new BezierAnimation(this.scene, controlPoints, 10);
};

MyBoard.prototype.parsePiece = function (pieceName) {


    switch (pieceName) {
        case 't1':
            return this.findWorker('t1');
        case 't2':
            return this.findWorker('t2');
        case 'b':
            var whitePiece = new MyPiecePlayer(this.scene, 1, new Position(this.pieceStartPosition.x, this.pieceStartPosition.y, this.pieceStartPosition.z));
            this.pieces.push(whitePiece);
            return whitePiece;
        case 'p':
            var blackPiece = new MyPiecePlayer(this.scene, 0, new Position(this.pieceStartPosition.x, this.pieceStartPosition.y, this.pieceStartPosition.z));
            this.pieces.push(blackPiece);
            return blackPiece;
        default:
            return null;
    }

};

MyBoard.prototype.findWorker = function(name){

    for(var i = 0; i < this.pieces.length; i++){

        if (this.pieces[i].name == name) {
            console.log('found');
            return this.pieces[i];
        }
    }
};

MyBoard.prototype.findPiece = function (board, piece) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == piece) {
                return new Position(i, 0, j);
            }
        }
    }

    return null;
};


MyBoard.prototype.update = function (currTime) {
    // update all

    for (var i = 0; i < this.pieces.length; i++) {
        this.pieces[i].update(currTime);
    }

};
