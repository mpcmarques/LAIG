function MyCube(scene){
    MyPrimitive.call(this, scene);

    this.rect = new MyRectangle(scene, 0, 1, 1, 0);

    this.topAppearance = null;
    this.appearance = null;
}

MyCube.prototype = Object.create(MyCube);
MyCube.prototype.constructor = MyCube;

MyCube.prototype.setTopAppearance = function(appearance) {
    this.topAppearance = appearance;
};

MyCube.prototype.setAppearance = function(apperance){
    this.appearance = apperance;
};

MyCube.prototype.display = function () {
    this.scene.pushMatrix();

    if(this.appearance != null)
        this.appearance.apply();

    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, 0, 1);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.rect.display();
    this.scene.popMatrix();

    // down
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.rect.display();
    this.scene.popMatrix();

    // up
    this.scene.pushMatrix();
    this.scene.translate(0,1,1);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    if(this.topAppearance != null) {
        this.topAppearance.apply();
    }
    this.rect.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
};

MyCube.prototype.scaleTexCoords = function(ampS, ampT){
    this.rect.scaleTexCoords(ampS, ampT);
};