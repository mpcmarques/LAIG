function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.edge = new MyEdge(scene);

    this.point = new MyPoint(scene);

    this.game = new Fabrik();
    this.game.getInitialBoard(this.loadedBoard);
}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;


MyBoard.prototype.loadedBoard = function(tab){

    this.board = tab;

    if(tab != null) {

        this.blackPieces = [];
        this.whitePieces = [];

        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                if (this.board[i][j] == 'p') {
                    var aux = new MyPiecePlayer(scene, 0, i, j);
                    this.blackPieces.push(aux);
                }
                if (this.board[i][j] == 'b') {
                    var aux = new MyPiecePlayer(scene, 1, i, j);
                    this.whitePieces.push(aux);
                }
                if (this.board[i][j] == 't1') {
                    this.t1 = new MyPieceWorker(scene, i, j, 't1');
                }
                if (this.board[i][j] == 't2') {
                    this.t2 = new MyPieceWorker(scene, i, j, 't2');
                }
            }
        }
    }
};

MyBoard.prototype.display = function () {
    this.scene.pushMatrix();



    this.scene.translate(-5,0,-5);

    if(this.t1 != null) {
        this.scene.pushMatrix();
        this.t2.display();
        this.scene.popMatrix();
    }
    if(this.t2 != null) {
        this.scene.pushMatrix();
        this.t1.display();
        this.scene.popMatrix();
    }
    if(this.blackPieces != null)
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
    }


    this.scene.pushMatrix();
    //this.edge.display();
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
