function MyPiece(scene, startPos){
    MyPrimitive.call(this, scene);

    this.startPos = new Position(startPos.x, startPos.y, startPos.z);
    this.material = null;

    this.position = new Position(startPos.x, startPos.y, startPos.z);
    this.animation = null;
}

MyPiece.prototype = Object.create(MyPrimitive.prototype);
MyPiece.prototype.constructor = MyPiece;

MyPiece.prototype.update = function(currTime) {
    if (this.animation != null) {
        this.animation.update(currTime);
        this.position = new Position(this.animation.position.x, this.animation.position.y, this.animation.position.z);
    }
};

