function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.edge = new MyEdge(scene);


    this.point = new MyPoint(scene);
    this.whitePieces = [];
    this.blackPieces = [];

    this.t1 = new MyPieceWorker(this.scene, 0, 0, 't1');
    this.t2 = new MyPieceWorker(this.scene, 0, 0, 't2');

    for(var i = 0;i < 10; i++)
    {
        var auxblack = new MyPiecePlayer(this.scene, 0, i, 0);
        this.blackPieces.push(auxblack);
        var auxwhite = new MyPiecePlayer(this.scene, 1, i, 0);
        this.whitePieces.push(auxwhite);
    }

}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.updateBoard = function () {

    /*
    if(this.scene.boardModified != null) {



        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                if (this.scene.boardModified[i][j] == 'p') {
                    var aux = new MyPiecePlayer(this.scene, 0, i, j);
                    this.blackPieces.push(aux);
                }
                if (this.scene.boardModified[i][j] == 'b') {
                    var aux = new MyPiecePlayer(this.scene, 1, i, j);
                    this.whitePieces.push(aux);
                }
                if (this.scene.boardModified[i][j] == 't1') {
                    this.t1 = new MyPieceWorker(this.scene, i, j, 't1');
                }
                if (this.scene.boardModified[i][j] == 't2') {
                    this.t2 = new MyPieceWorker(this.scene, i, j, 't2');
                }
            }
        }
    }*/

    this.t1 = new MyPieceWorker(this.scene, 0, 0, 't1');
    this.t2 = new MyPieceWorker(this.scene, 0, 0, 't2');

    for(var i = 0;i < 10; i++)
    {
        var auxblack = new MyPiecePlayer(this.scene, 0, i, -2);
        this.blackPieces.push(auxblack);
        var auxwhite = new MyPiecePlayer(this.scene, 1, i, -2);
        this.whitePieces.push(auxwhite);
    }
}

MyBoard.prototype.display = function () {
    //this.updateBoard();

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


    for(var i = 0;i <  this.whitePieces.length; i++)
    {
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.registerForPick(1003 + i,this.whitePieces[i]);
        this.whitePieces[i].display();
        this.whitePieces[i].posY = -2;
        this.scene.popMatrix();
    }

    for(var i = 0;i <  this.blackPieces.length; i++)
    {
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.registerForPick(1013 + i,this.blackPieces[i]);
        this.blackPieces[i].display();
        this.blackPieces[i].posY = -2;
        this.scene.popMatrix();
    }
    /*if(this.blackPieces != null)
    {
        for (var i in this.blackPieces) {
            this.scene.pushMatrix();
            this.blackPieces[i].display();
            this.scene.popMatrix();
        }
    }
    if(this.whitePieces != null)
    {
        for (var i in this.blackPieces) {
            this.scene.pushMatrix();
            this.whitePieces[i].display();
            this.scene.popMatrix();
        }
    }*/






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


MyBoard.prototype.animatePiece = function (piece) {

    if(this.scene.position < 200)
    this.scene.translate(parseInt((this.scene.position-1) / 11), 1, (this.scene.position-1) % 11);
    //console.log(parseInt((this.scene.position-1) / 11),((this.scene.position-1) % 11));

};
