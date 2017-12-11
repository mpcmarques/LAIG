function MyPieceWorker(scene){
  MyPiece.call(this, scene);

  this.material = new CGFappearance(scene);

  this.cyl = new MyCylinderWithCover(scene,2,2,2,20,20,1,1);

  this.appearance();  

}

MyPieceWorker.prototype = Object.create(MyPiece.prototype);
MyPieceWorker.prototype.constructor = MyPieceWorker;

MyPieceWorker.prototype.display = function(){

  this.scene.pushMatrix();
  this.cyl.display();
  this.scene.popMatrix();

};

MyPieceWorker.prototype.appearance = function(){
  this.material.setShininess(10);
  this.material.setAmbient(1, 1, 1, 1);
  this.material.setDiffuse(1, 0, 0, 1);
  this.material.setSpecular(1, 0, 0, 1);
  this.material.setEmission(1, 0,0, 1);
}
