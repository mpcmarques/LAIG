function MyPiece(scene){
    MyPrimitive.call(this, scene);

};

MyPiece.prototype = Object.create(MyPrimitive.prototype);
MyPiece.prototype.constructor = MyPiece;

