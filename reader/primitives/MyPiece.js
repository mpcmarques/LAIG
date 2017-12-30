function MyPiece(scene, startPos){
    MyPrimitive.call(this, scene);

    this.startPos = new Position(startPos.x, startPos.y, startPos.z);

}

MyPiece.prototype = Object.create(MyPrimitive.prototype);
MyPiece.prototype.constructor = MyPiece;

