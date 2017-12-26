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

/*
    var obj = 1;

    //this.scene.setActiveShader(this.shade);
    for (var t = 0; t < 2 ;t++) {
        this.scene.pushMatrix();
        if(t == 1) {
            this.scene.translate(10,0,0);
            this.scene.rotate(-90 * DEGREE_TO_RAD, 0, 1, 0);

        }
        for (k = 0; k < 11; k++) {
            this.scene.pushMatrix();
            if (k == 0) {
                this.scene.translate(0, 1, 0.2 + k);
            }
            else
                this.scene.translate(0, 1, k);
            for (var i = 0; i < 10; i++) {
                this.scene.pushMatrix();
                this.scene.translate(i, 0, 0);
                this.scene.rotate(-Math.PI / 2, 1, 0, 0);
                //this.scene.registerForPick(obj, this.rect);
                this.topAppearance.apply();
                this.rect.display();
                this.scene.popMatrix();
                obj++;
            }
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
*/
    this.scene.translate(0,1,0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.rect.display();


    this.scene.popMatrix();

};



MyPoint.prototype.scaleTexCoords = function(ampS, ampT){
    this.rect.scaleTexCoords(ampS, ampT);
};