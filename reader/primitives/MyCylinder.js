/**
 * MyCylinder
 * @param scene Scene.
 * @param height    Height.
 * @param bottomRadius  Cylinder bottom radius
 * @param topRadius     Cylinder top radius.
 * @param stacks        Stacks.
 * @param slices        Slices.
 * @constructor
 */
function MyCylinder(scene, height, bottomRadius, topRadius, stacks, slices) {
    CGFobject.call(this, scene);

    this.height = height;
    this.slices = slices;
    this.stacks = stacks;
    this.topRadius = topRadius;
    this.bottomRadius = bottomRadius;

    this.initBuffers();
}

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {

    //	Init with empty arrays
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    //	Calculate vertice coordinate;
    var radius = this.bottomRadius;
    var deltaRadius = (this.topRadius - this.bottomRadius) / this.stacks;
    var rotation = 2 * Math.PI / this.slices;
    var deltaHeight = this.height / this.stacks;
    var m = this.height / (this.bottomRadius - this.topRadius);
    var maxHeight;
    if (this.bottomRadius > this.topRadius)
        maxHeight = this.topRadius * m + this.height;
    else maxHeight = this.bottomRadius * m + this.height;

    for (var i = 0; i <= this.stacks; i++) {
        for (var j = 0; j <= this.slices; j++) {
            this.vertices.push(
                radius * Math.cos(j * rotation),
                radius * Math.sin(j * rotation),
                i * deltaHeight
            );
            if (Math.abs(this.bottomRadius - this.topRadius) < 0.0001) {
                this.normals.push(
                    Math.cos(j * rotation),
                    Math.sin(j * rotation),
                    0);
            }
            else if (this.bottomRadius > this.topRadius) {
                this.normals.push(
                    maxHeight * Math.cos(j * rotation) / Math.sqrt(Math.pow(this.bottomRadius, 2) + Math.pow(maxHeight, 2)),
                    maxHeight * Math.sin(j * rotation) / Math.sqrt(Math.pow(this.bottomRadius, 2) + Math.pow(maxHeight, 2)),
                    this.bottomRadius / Math.sqrt(Math.pow(this.bottomRadius, 2) + Math.pow(maxHeight, 2))
                );
            }
            else {
                this.normals.push(
                    maxHeight * Math.cos(j * rotation) / Math.sqrt(Math.pow(this.topRadius, 2) + Math.pow(maxHeight, 2)),
                    maxHeight * Math.sin(j * rotation) / Math.sqrt(Math.pow(this.topRadius, 2) + Math.pow(maxHeight, 2)),
                    this.topRadius / Math.sqrt(Math.pow(this.topRadius, 2) + Math.pow(maxHeight, 2))
                );
            }

            this.texCoords.push(j / this.slices, i / this.stacks);
        }
        radius = (i + 1) * deltaRadius + this.bottomRadius;
    }

    for (var i = 0; i < this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {
            this.indices.push(
                i * (this.slices + 1) + j,
                i * (this.slices + 1) + (j + 1),
                (i + 1) * (this.slices + 1) + (j + 1)
            );
            this.indices.push(
                (i + 1) * (this.slices + 1) + (j + 1),
                (i + 1) * (this.slices + 1) + j,
                i * (this.slices + 1) + j
            );
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MyCylinder.prototype.scaleTexCoords = function(ampS, ampT) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i + 1] = this.texCoords[i+1] / ampT;
    }
    this.updateTexCoordsGLBuffers();
};
