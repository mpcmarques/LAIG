function MyCylinderWithCover(scene, height, bottomRadius, topRadius, stacks, slices) {
    CGFobject.call(this, scene);

    this.height = height;

    this.cylinder = new MyCylinder(scene, height, bottomRadius, topRadius, stacks, slices);

    this.cover = new MyCircle(scene, slices);
}

MyCylinderWithCover.prototype = Object.create(CGFobject.prototype);
MyCylinderWithCover.prototype.constructor = MyCylinderWithCover;

MyCylinderWithCover.prototype.display = function () {
    // Cylinder
    this.scene.pushMatrix();
        this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0, this.height);
        this.scene.scale(2,2,2);
        this.cover.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(2,2,2);
        this.cover.display();
    this.scene.popMatrix();
};

MyCylinderWithCover.prototype.scaleTexCoords = function(ampS, ampT) {
    /*for (var i = 0; i < this.texCoords.length; i += 2) {
     this.texCoords[i] = this.texCoords[i] / ampS;
     this.texCoords[i + 1] = this.texCoords[i+1] / ampT;
     }
     this.updateTexCoordsGLBuffers();*/
};
