/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, vector) {
    CGFobject.call(this, scene);

    this.vector = vector;

    if(vector.length !== 9)
        console.warn('The triangle needs to have 9 coords');

    this.initBuffers();
}

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function() {
    this.vertices = [
        this.vector[0],this.vector[1],this.vector[2],
        this.vector[3],this.vector[4],this.vector[5],
        this.vector[6],this.vector[7],this.vector[8]
    ];

    this.indices = [
        0,1,2
    ];

    this.normals = [
        0,0,1,
        0,0,1,
        0,0,1
    ];

    this.texCoords = [
        0,0,
        1,0,
        0,1
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};