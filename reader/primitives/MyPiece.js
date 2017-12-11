function MyPiece(scene){
    MyPrimitive.call(this, scene);
//  this.cyl = new   MyCylinderWithCover(this.scene, 1, 1, 1, 20,20,1,1);
}

MyPiece.prototype = Object.create(MyPrimitive.prototype);
MyPiece.prototype.constructor = MyPeca;

/*
MyPiece.prototype.display = function(){

  this.scene.pushMatrix();
  this.cyl.display();
  this.scene.popMatrix();

}*/
