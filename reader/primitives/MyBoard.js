function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.base = new MyCube(scene);
    //this.unit = new MyCube(scene);
    this.unit = new Array(10);
    for (var i = 0; i < 10; i++) {
        this.unit[i] = new Array(10);
    }

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


    for (var x = 0; x < 10; x++) {
        for (var z = 0; z < 10; z++) {
            this.unit[x][z] = new MyCube(scene,x,z);
            this.unit[x][z].setAppearance(woodAppearance);
            this.unit[x][z].setTopAppearance(cubeAppearance);
        }
    }
    this.edge = new MyEdge(scene);

    this.game = new Fabrik();
    this.game.getInitialBoard(this.loadedBoard);
};

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

    var obj = 0;

    this.scene.translate(-5,0,-5);

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
            //this.scene.registerForPick(obj, this.unit[x][z]);
            this.unit[x][z].display();
            this.scene.popMatrix();
            obj++;
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

    this.scene.pushMatrix();
    this.scene.translate(0,-0.1,0);
    //this.edge.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
};
