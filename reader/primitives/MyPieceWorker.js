function MyPieceWorker(scene){
  MyPiece.call(this, scene);

  this.material = new CGFappearance(scene);
  var arg = [];
  arg[0]=1.5;
  arg[1]=20;
  arg[2]=20;
  this.cyl = new MySphere(scene,arg);

  this.appearance();

}

MyPieceWorker.prototype = Object.create(MyPiece.prototype);
MyPieceWorker.prototype.constructor = MyPieceWorker;

MyPieceWorker.prototype.display = function(){
  this.scene.pushMatrix();
  this.scene.scale(0.5,0.25,0.5);
  this.scene.translate(15,4,15);
  this.scene.rotate(90 *DEGREE_TO_RAD,1,0,0);
  this.material.apply();
  this.cyl.display();
  this.scene.popMatrix();

};

MyPieceWorker.prototype.appearance = function(){
  this.material.setShininess(10);
  this.material.setAmbient(0.3, 0, 0, 1);
  this.material.setDiffuse(0.2, 0, 0, 1);
  this.material.setSpecular(0.5, 0.4, 0.4, 1);
};