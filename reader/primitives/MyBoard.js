function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.point = new MyPoint(scene);
    this.whitePieces = [];
    this.blackPieces = [];
    this.t1 = new MyPieceWorker(this.scene, 0, 0, 't1');
    this.t2 = new MyPieceWorker(this.scene, 0, 0, 't2');

    this.lastBoard = null;
    this.currentBoard = null;

    this.auxblack = new MyPiecePlayer(this.scene, 0, 0, -2);
    this.auxwhite = new MyPiecePlayer(this.scene, 1, 1, -2);

    this.blackStartPos = new Position(-2, 1, 0);
    this.whiteStartPos = new Position(-2, 1, 1);
    this.t1startPos = new Position(-1,1,0);
    this.t2startPos = new Position(-1,1,-1);

}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {



    this.scene.pushMatrix();
    this.scene.translate(-5,0,-5);

    this.scene.pushMatrix();
    this.scene.translate(-1,1,0);
    this.scene.registerForPick(1002, this.t2);
    if(this.t2.animation != null)
        this.t2.animation.apply();
    this.t2.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(-1,1,1);
    this.scene.registerForPick(1001, this.t1);

    if(this.t1.animation != null) {
        //console.log(this.t1.animation);
        this.t1.animation.apply();
    }

    this.t1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.registerForPick(1003,this.auxwhite);
    this.auxwhite.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.registerForPick(1004,this.auxblack);
    this.auxblack.display();
    this.scene.popMatrix();



    this.scene.pushMatrix();
    var obj = 0;
    for(var j = 1; j <= 11; j++) {

    this.scene.pushMatrix();
        for (var i = 1; i <= 11; i++) {
            obj++;
            this.scene.registerForPick(obj, this.point);
            this.point.display();
            this.scene.translate(0, 0, 1);

        }
        this.scene.popMatrix();
        this.scene.translate(1,0,0);

    }
    this.scene.popMatrix();



    this.scene.popMatrix();
};

MyBoard.prototype.updateBoard = function (board) {
    this.lastBoard = this.currentBoard;
    this.currentBoard = board;
    var posAnt = null;
    var posCurr = null;
    var piece1;

    // TODO: DEBUG
    console.log(this.lastBoard,this.currentBoard);

    if(this.lastBoard != null){
        for(var i = 0; i < this.lastBoard.length; i++)
        {
            for(var j = 0; j < this.lastBoard[i].length; j++)
            {
                if(this.lastBoard[i][j] != this.currentBoard[i][j])
                {
                    //usar find para ver a pos actual e ant
                    piece1 = this.currentBoard[i][j];

                    var pos = this.findPiece(this.currentBoard, piece1);
                    var lastPos = this.findPiece(this.lastBoard,piece1);
                    if(pos != null){
                        posCurr = pos;
                    }

                    if(posAnt != null)
                    {
                        posAnt = lastPos;
                    }
                }
            }
        }
    }

    var piecePrimitive = this.parsePiece(piece1);

    if(piecePrimitive != null) {
        var pos2, pos3, controlPoints;
        //var controlPoints = [[posXAnt,1,posYAnt],[posXAnt,2,posYAnt],[posXCurr,2,posYCurr],[posXCurr,1,posYCurr]];
        if (posAnt != null) {
            pos2 = new Position(posAnt.x, posAnt.y + 1, posAnt.z);
            pos3 = new Position(posCurr.x, posCurr.y + 1, posCurr.z);
            controlPoints = [posAnt, pos2, pos3, posCurr];
        }else {
            pos2 = new Position(this.t1startPos.x, this.t1startPos.y + 1, this.t1startPos.z);
            pos3 = new Position(posCurr.x, posCurr.y + 1, posCurr.z);
            controlPoints = [this.t1startPos, pos2, pos3, posCurr];
        }
        piecePrimitive.animation = new BezierAnimation(this.scene, controlPoints, 3);
    }


    console.log(posAnt,posCurr);
};

MyBoard.prototype.parsePiece = function(pieceName){

    switch (pieceName){
        case 't1':
            return this.t1;
        case 't2':
            return this.t2;
        case 'b':
            var blackPiece = new MyPiecePlayer(this.scene, 0, this.blackStartPos.x, this.blackStartPos.y);
            this.blackPieces.push(blackPiece);
            return blackPiece;
        case 'p':
            var whitePiece = new MyPiecePlayer(this.scene, 1, this.whiteStartPos.x, this.whiteStartPos.y);
            this.whitePieces.push(whitePiece);
            return whitePiece;
        default:
            return null;
    }

};

MyBoard.prototype.findPiece = function(board, piece){

    for(var i = 0; i < board.length; i++){
        for (var j = 0; j < board[i].length; j++){
            if(board[i][j] == piece){
                return new Position(i, 0, j);
            }
        }
    }

    return null;
};


MyBoard.prototype.update = function(currTime){
    // update all
    this.t1.update(currTime);
    this.t2.update(currTime);

    for(var i = 0; i < this.whitePieces.length; i++){
        this.whitePieces[i].update(currTime);
    }

    for(var j = 0; j < this.blackPieces.length; j++){
        this.blackPieces.update(currTime);
    }
};
