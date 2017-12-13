

function MyPiecePlayer(scene, color)
{
  MyPiece.call(this,scene)

  this.material = new CGFappearance(scene);
  var arg = [];
  arg[0]=1;
  arg[1]=20;
  arg[2]=20;
  this.cyl = new MySphere(scene,arg);

  this.color = color;

  this.appearance();

}

MyPiecePlayer.prototype = Object.create(MyPiece.prototype);
MyPiecePlayer.prototype.constructor = MyPiecePlayer;

MyPiecePlayer.prototype.display = function(){

  this.scene.pushMatrix();
  this.scene.scale(0.5,0.25,0.5);
  this.scene.translate(10,4,10);
  this.scene.rotate(90 *DEGREE_TO_RAD,1,0,0);
  this.material.apply();
  this.cyl.display();
  this.scene.popMatrix();
}

MyPiecePlayer.prototype.appearance = function(){
  if(this.color){
    this.material.setShininess(10);
    this.material.setAmbient(0.1, 0.1, 0.1, 1);
    this.material.setDiffuse(0.55, 0.55, 0.55, 1);
    this.material.setSpecular(0.7,0.7, 0.7, 1);
  }else if(!this.color){
    this.material.setShininess(10);
    this.material.setAmbient(0.1, 0.1, 0.1, 1);
    this.material.setDiffuse(0.01, 0.01, 0.01, 1);
    this.material.setSpecular(0.5, 0.5, 0.5, 1);
  }
}


