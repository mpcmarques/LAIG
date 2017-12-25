function MyEdge(scene){
    MyPrimitive.call(this, scene);

    this.rect = new MyRectangle(scene, 0, 0.2, 1, 0);

    this.topAppearance = new CGFappearance(scene);
    this.appearance = null;
    this.shade =  new CGFshader(this.scene.gl, "shaders/vertex.vert", "shaders/vertex.frag");

}

MyEdge.prototype = Object.create(MyCube);
MyEdge.prototype.constructor = MyCube;

MyEdge.prototype.setTopAppearance = function(appearance) {
    this.topAppearance = appearance;
};

MyEdge.prototype.setAppearance = function(apperance){
    this.appearance = apperance;
};

MyEdge.prototype.display = function () {

    this.scene.pushMatrix();

    if (this.appearance != null)
        this.appearance.apply();

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
                this.scene.registerForPick(obj, this.rect);
                this.topAppearance.apply();
                this.rect.display();
                this.scene.popMatrix();
                obj++;
            }
            this.scene.popMatrix();
    }

    this.scene.popMatrix();
}





    this.scene.popMatrix();

};



MyEdge.prototype.scaleTexCoords = function(ampS, ampT){
    this.rect.scaleTexCoords(ampS, ampT);
};