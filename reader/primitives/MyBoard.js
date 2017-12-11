function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.cube = new MyCube(scene);

    // cube appearance
    var cubeAppearance = new CGFappearance(scene);
    cubeAppearance.setAmbient(0.3,0.3,0.3,1);
    cubeAppearance.setDiffuse(0.5,0.5,0.5,1);
    cubeAppearance.setSpecular(0.5,0.5,0.5,1);
    cubeAppearance.loadTexture("scenes/images/board_unit.jpg");
    this.cube.setTopAppearance(cubeAppearance);
    this.player = new MyPiecePlayer(scene, 0);
    this.worker = new MyPieceWorker(scene);
}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
    this.scene.pushMatrix();

    this.scene.translate(-11/2, 0, -11/2);

    // base
    this.scene.pushMatrix();
        this.scene.scale(11,0.5,11);
        this.cube.display();
    this.scene.popMatrix();

    for(var x = 0; x < 11; x++){
        for(var z = 0;  z < 11; z++){
            this.scene.pushMatrix();
            this.scene.translate(x, 0.5, z);
            this.scene.scale(1,0.2,1);
            this.cube.display();
            this.scene.popMatrix();
        }
    }
    this.player.display();
    this.worker.display();
    this.scene.popMatrix();

};