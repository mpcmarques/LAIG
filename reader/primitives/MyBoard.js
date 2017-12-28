function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.edge = new MyEdge(scene);

    this.isItClicked1 = false;
    this.isItClicked2 = false;
    this.point = new MyPoint(scene);

    this.worker1 = new MyPieceWorker(scene,0,0,"t1");
    this.worker2 = new MyPieceWorker(scene,0,0,"t2");


}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;



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
