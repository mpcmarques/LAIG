function MyPiecePlayer(scene, color)
{
  MyPiece.call(this,scene)

  this.material = new CGFappearance(scene);

  this.cyl = new MyCylinderWithCover(scene,1,1,1,20,20,1,1);

  this.color = color;

  this.appearance();

}

MyPiecePlayer.prototype = Object.create(MyPiece.prototype);
MyPiecePlayer.prototype.constructor = MyPiecePlayer;

MyPiecePlayer.prototype.display = function(){

  this.scene.pushMatrix();
  this.cyl.display();
  this.scene.popMatrix();
}

MyPiecePlayer.prototype.appearance = function(){
  if(this.color){
    this.material.setShininess(10);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(1, 1, 1, 1);
    this.material.setSpecular(1, 1, 1, 1);
    this.material.setEmission(1, 1, 1, 1);
  }else if(!this.color){
    this.material.setShininess(10);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(0, 0, 0, 1);
    this.material.setSpecular(0, 0, 0, 1);
    this.material.setEmission(0, 0, 0, 1);
  }
}
