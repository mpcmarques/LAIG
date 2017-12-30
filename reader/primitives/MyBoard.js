function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.point = new MyPoint(scene);
    this.whitePieces = [];
    this.blackPieces = [];
    this.t1 = new MyPieceWorker(this.scene, 0, 0, 't1',new Position(-1,1,0));
    this.t2 = new MyPieceWorker(this.scene, 0, 0, 't2',new Position(-1,1,0));
    this.lastPrimitive = null;
    this.lastBoard = null;
    this.currentBoard = null;
    this.primitiveUndo = null;
    this.actual = null;
    this.auxblack = new MyPiecePlayer(this.scene, 0, 0, -2);
    this.auxwhite = new MyPiecePlayer(this.scene, 1, 1, -2);

    this.blackStartPos = new Position(-2, 1, 0);
    this.whiteStartPos = new Position(-2, 1, 1);


    
    this.positions = [];

    for (var i=0; i<11 ;i++) {
        this.positions[i]= [];
        for (var j=0;j<11;j++) {
            this.positions[i][j]= new Position(i,0,j);
        }
    }
}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {



    this.scene.pushMatrix();
    this.scene.translate(-5,0,-5);


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
    this.scene.translate(-1,1,0);
    this.scene.registerForPick(1002, this.t2);
    if(this.t2.animation != null)
        this.t2.animation.apply();
    this.t2.display();
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


    this.actual = new Position(0,0,0);

    // TODO: DEBUG
   // console.log(this.lastBoard,this.currentBoard);

    if(this.lastBoard != null){
        for(var i = 0; i < this.lastBoard.length; i++)
        {
            for(var j = 0; j < this.lastBoard[i].length; j++)
            {
                if(this.lastBoard[i][j] != this.currentBoard[i][j])
                {

                    // usar find para ver a pos actual e ant
                    currentPiece = this.currentBoard[i][j];
                    lastPiece = this.lastBoard[i][j];

                    var posTab = this.findPiece(this.currentBoard, currentPiece);
                    var lastTabPos = this.findPiece(this.lastBoard, currentPiece);
                    
                    var piecePrimitive, lastPos, newPos;

                    console.log(currentPiece, lastPiece);
                    
                    // caso da peca nao ter sido colocado no tabuleiro.
                    if (posTab != null && lastTabPos == null){

                        piecePrimitive = this.parsePiece(currentPiece);
                        
                        if (piecePrimitive != null){

                            lastPos = piecePrimitive.startPos;

                            newPos = this.positions[i][j];


                            this.animatePiece(piecePrimitive, lastPos, newPos);
                        }

                    }
                    
                    // caso da peca ja existir no tabuleiro
                    else if (posTab != null && lastTabPos != null){

                        piecePrimitive = this.parsePiece(currentPiece);

                        if (piecePrimitive != null){

                            lastPos = this.positions[lastTabPos.x][lastTabPos.z];

                            newPos = this.positions[i][j];

                            this.animatePiece(piecePrimitive, lastPos, newPos);
                        }

                    }

                    // caso da peca ser removida do tabuleiro
                    else if (posTab == null && lastTabPos != null){

                        piecePrimitive = this.parsePiece(lastPiece);

                        if (piecePrimitive != null){

                            lastPos = this.positions[i][j];

                            newPos = piecePrimitive.startPos;

                            this.animatePiece(piecePrimitive, lastPos, newPos);
                        }
                        
                    }

                    break;
                }
            }
        }
    }

    


    /*

    var piecePrimitive = this.parsePiece(piece1);

    var piecePrimitiveUndo = this.parsePiece(piece1);



    if(posCurr != null) {
        if (piecePrimitive != null) {
            var pos2, pos3, controlPoints;


            if (this.actual == null || piecePrimitive != this.lastPrimitive) {
                this.actual = piecePrimitive.startPos;
                console.log(piecePrimitive.startPos);
            }

            pos2 = new Position(this.actual.x, this.actual.y + 3, this.actual.z);
            pos3 = new Position(this.actual.x, this.actual.y + 3, this.actual.z);
            if (piecePrimitive.name == 't1') {
                posCurr.x += 1;
                posCurr.z += -1;
            } else if (piecePrimitive.name == 't2') {
                posCurr.x += 1;
            }

            controlPoints = [this.actual, pos2, pos3, posCurr];
            piecePrimitive.animation = new BezierAnimation(this.scene, controlPoints, 5);
            this.actual = posCurr;
            this.lastPrimitive = piecePrimitive;
        }
    }else if(posCurr == null) {
        if (this.primitiveUndo != null) {
            var pos2, pos3, controlPoints;


            pos2 = new Position(this.actual.x,this.actual.y + 3, this.actual.z);
            pos3 = new Position(this.primitiveUndo.startPos.x, this.primitiveUndo.startPos.y + 3, this.primitiveUndo.startPos.z);

            controlPoints = [this.actual, pos2, pos3, this.primitiveUndo.startPos];
            this.primitiveUndo.animation = new BezierAnimation(this.scene, controlPoints, 5);
            posCurr = this.primitiveUndo.startPos;
        }
    }


    this.primitiveUndo = piecePrimitive;
    */

};

MyBoard.prototype.animatePiece = function(piece, lastPos, newPos){
    var point2 = new Position(lastPos.x, lastPos.y + 5, lastPos.z);
    var point3 = new Position(newPos.x, newPos.y + 5, newPos.z);
    switch(piece.name) {
        case 't1':
            newPos.x = newPos.x +1;
            newPos.z = newPos.z - 1;
            break;
        case 't2':
            newPos.x = newPos.x +1;
            break;
        case 'b':
            newPos.x = newPos.x + 2;
            newPos.z = newPos.z - 1;
        case 'p':
            newPos.x = newPos.x + 2;
        default:
            break;
    }

    var controlPoints = [lastPos, point2, point3, newPos];

    piece.animation = new BezierAnimation(this.scene, controlPoints, 10);
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
