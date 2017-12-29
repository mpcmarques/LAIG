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

}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {



    this.scene.pushMatrix();
    this.scene.translate(-5,0,-5);

    this.scene.pushMatrix();
    this.scene.translate(-1,1,0);
    this.scene.registerForPick(1002, this.t2);
    this.t2.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(-1,1,1);
    this.scene.registerForPick(1001, this.t1);
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
    var posXAnt = null;
    var posYAnt = null;
    var posXCurr = null;
    var posYCurr = null;
    console.log(this.lastBoard,this.currentBoard);


    if(this.lastBoard != null){
        for(var i = 0; i < this.lastBoard.length; i++)
        {
            for(var j = 0; j < this.lastBoard[i].length; j++)
            {
                if(this.lastBoard[i][j] != this.currentBoard[i][j])
                {
                    //usar find para ver a pos actual e ant
                    var piece1 = this.currentBoard[i][j];

                    var pos = this.findPiece(this.currentBoard, piece1);

                    if(pos != null){
                        posXCurr = pos[0];
                        posYCurr = pos[1];
                    }
                }
            }
        }
    }

}


MyBoard.prototype.addPieceAnimation = function () {




    var ani = new BezierAnimation(this.scene,controlPoints ,1);




};


MyBoard.prototype.findPiece = function(board, piece){

    for(var i = 0; i < board.length; i++){
        for (var j = 0; j < board[i].length; j++){
            if(board[i][j] == piece){
                return [i,j];
            }
        }
    }

    return null;
};
