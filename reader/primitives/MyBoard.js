function MyBoard(scene) {
    MyPrimitive.call(this, scene);

    this.cube = new MyCube(scene);
}

MyBoard.prototype = Object.create(MyPrimitive.prototype);
MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.display = function () {
    this.scene.pushMatrix();

    // display cube
    this.cube.display();

    this.scene.popMatrix();
};