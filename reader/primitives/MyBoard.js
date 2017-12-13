function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.base = new MyCube(scene);
    this.unit = new MyCube(scene);

    /*  this.boardtest = new Array(11);

      for (var i = 0; i < 11; i++) {
          this.boardtest[i] = new Array(11);
          for (var j = 0; j < 11; j++)
              this.boardtest[i][j] = 'e';
  }
  */
//preta p branca b vermelha t1 e t2

    this.boardtest = [
        ['e','e','e','e','b','e','e','e','e','e','e'],
        ['e','b','e','b','e','b','b','e','e','b','e'],
        ['e','b','e','b','e','e','b','p','b','e','e'],
        ['p','b','b','e','e','e','e','b','b','e','e'],
        ['b','e','p','e','p','p','p','p','e','e','e'],
        ['e','p','p','b','b','p','e','p','b','e','e'],
        ['b','p','e','p','e','p','p','p','e','e','e'],
        ['e','e','e','e','t1','p','p','e','b','e','e'],
        ['b','p','e','e','p','p','e','e','e','t2','e'],
        ['e','e','e','e','e','e','e','e','e','e','e'],
        ['e','e','p','e','e','e','e','b','e','e','e']
    ];


    this.blackPieces = [];
    this.whitePieces = [];


    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            if (this.boardtest[i][j] == 'p') {
                var aux = new MyPiecePlayer(scene, 0, i, j);
                this.blackPieces.push(aux);
            }
            if (this.boardtest[i][j] == 'b') {
                var aux = new MyPiecePlayer(scene, 1, i, j);
                this.whitePieces.push(aux);
            }
            if (this.boardtest[i][j] == 't1') {
                this.t1 = new MyPieceWorker(scene, i, j,'t1');
            }
            if (this.boardtest[i][j] == 't2') {
                this.t2 = new MyPieceWorker(scene, i, j,'t2');
            }
        }
    }

    console.log(this.boardtest);

    // wood appearance
    var woodAppearance = new CGFappearance(scene);
    woodAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    woodAppearance.setDiffuse(0.55, 0.55, 0.55, 1);
    woodAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    woodAppearance.setShininess(0.25);
    woodAppearance.loadTexture("scenes/images/wood.jpg");
    this.base.setAppearance(woodAppearance);
    this.base.scaleTexCoords(0.5, 1);

    // cube top appearance
    var cubeAppearance = new CGFappearance(scene);
    cubeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    cubeAppearance.setDiffuse(0.55, 0.55, 0.55, 1);
    cubeAppearance.setSpecular(0.7, 0.7, 0.7, 1);
    cubeAppearance.setShininess(0.25);
    cubeAppearance.loadTexture("scenes/images/board_unit.jpg");
    this.unit.setAppearance(woodAppearance);
    this.unit.setTopAppearance(cubeAppearance);

    this.worker = new MyPieceWorker(scene);

    this.player = new MyPiecePlayer(scene, 0);

    console.log(this.t1);
    console.log(this.t2);
    console.log(this.blackPieces);
    console.log(this.whitePieces);

};

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
    this.scene.pushMatrix();

    //this.scene.translate(-11 / 2, 0, -11 / 2);

    // base
    this.scene.pushMatrix();
    this.scene.scale(10, 0.5, 10);
    this.base.display();
    this.scene.popMatrix();


    for (var x = 0; x < 10; x++) {
        for (var z = 0; z < 10; z++) {
            this.scene.pushMatrix();
            this.scene.translate(x, 0.5, z);
            this.scene.scale(1, 0.2, 1);
            this.unit.display();
            this.scene.popMatrix();
        }
    }
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


    this.scene.popMatrix();
};