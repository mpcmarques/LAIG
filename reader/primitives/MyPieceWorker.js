function MyPieceWorker(scene, name, startPos){
  MyPiece.call(this, scene, startPos);

  this.material1 = new CGFappearance(scene);
  this.material2 = new CGFappearance(scene);
  var arg = [];
  arg[0]=1.5;
  arg[1]=20;
  arg[2]=20;

  this.cyl = new MySphere(scene,arg);
  this.name = name;

  this.createAppearance();
}

MyPieceWorker.prototype = Object.create(MyPiece.prototype);
MyPieceWorker.prototype.constructor = MyPieceWorker;

MyPieceWorker.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.translate(0,1,0);
    this.scene.scale(0.25, 0.20, 0.25);
    this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);

    if (!this.selected) {
        this.material1.apply();
    } else {
        this.material2.apply();
    }

  this.cyl.display();

  this.scene.popMatrix();
};

MyPieceWorker.prototype.createAppearance = function(){

    this.material1.setShininess(10);
    this.material1.setAmbient(0.3, 0, 0, 1);
    this.material1.setDiffuse(0.2, 0, 0, 1);
    this.material1.setSpecular(0.5, 0.4, 0.4, 1);

    this.material2.setShininess(10);
    this.material2.setAmbient(0.3, 0, 0, 1);
    this.material2.setDiffuse(0, 0, 0.2, 1);
    this.material2.setSpecular(0.5, 0.4, 0.4, 1);

};

