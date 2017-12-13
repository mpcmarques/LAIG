function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.base = new MyCube(scene);
    this.unit = new MyCube(scene);

    // wood appearance
    var woodAppearance = new CGFappearance(scene);
    woodAppearance.setAmbient(0.1,0.1,0.1, 1);
    woodAppearance.setDiffuse(0.55,0.55,0.55,1);
    woodAppearance.setSpecular(0.7,0.7,0.7,1);
    woodAppearance.setShininess(0.25);
    woodAppearance.loadTexture("scenes/images/wood.jpg");
    this.base.setAppearance(woodAppearance);
    this.base.scaleTexCoords(0.5, 1);

    // cube top appearance
    var cubeAppearance = new CGFappearance(scene);
    cubeAppearance.setAmbient(0.1,0.1,0.1, 1);
    cubeAppearance.setDiffuse(0.55,0.55,0.55,1);
    cubeAppearance.setSpecular(0.7,0.7,0.7,1);
    cubeAppearance.setShininess(0.25);
    cubeAppearance.loadTexture("scenes/images/board_unit.jpg");
    this.unit.setAppearance(woodAppearance);
    this.unit.setTopAppearance(cubeAppearance);

    this.worker = new MyPieceWorker(scene);

    this.player = new MyPiecePlayer(scene, 0);

}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
    this.scene.pushMatrix();

    this.scene.translate(-11/2, 0, -11/2);

    // base
    this.scene.pushMatrix();
        this.scene.scale(11,0.5,11);
        this.base.display();
    this.scene.popMatrix();

    for(var x = 0; x < 11; x++){
        for(var z = 0;  z < 11; z++){
            this.scene.pushMatrix();
            this.scene.translate(x, 0.5, z);
            this.scene.scale(1,0.2,1);
            this.unit.display();
            this.scene.popMatrix();
        }
    }

    this.worker.display();
    this.player.display();

    this.scene.popMatrix();
};