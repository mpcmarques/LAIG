function MyPoint(scene){
    MyPrimitive.call(this, scene);

    this.rect = new MyRectangle(scene, 0, 0.2, 0.2, 0);
    this.appearance = new CGFappearance(scene);
    this.appearance.setShininess(1);
    this.appearance.setSpecular(0, 0, 0, 1);
    this.appearance.setDiffuse(0, 0, 0, 1);
    this.appearance.setAmbient(0, 0, 0, 1);
    this.appearance.setEmission(0, 0, 0, 1);

    this.shade =  new CGFshader(this.scene.gl, "shaders/vertex.vert", "shaders/vertex.frag");

}

MyPoint.prototype = Object.create(MyPoint);
MyPoint.prototype.constructor = MyPoint;




MyPoint.prototype.display = function () {

    this.scene.pushMatrix();


        this.appearance.apply();


    this.scene.translate(0,1,0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.translate(0,-0.2,0);
    this.rect.display();


    this.scene.popMatrix();

};



MyPoint.prototype.scaleTexCoords = function(ampS, ampT){
    this.rect.scaleTexCoords(ampS, ampT);
};