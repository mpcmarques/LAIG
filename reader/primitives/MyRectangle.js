/**
 * MyRectangle
 * @constructor
 */
function MyRectangle(scene, minS, maxS, minT, maxT) {
    CGFobject.call(this,scene);

    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;

    this.initBuffers();
}

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function() {

    this.vertices = [
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        -0.5, 0.5, 0,
        0.5, 0.5, 0,
    ];

    this.indices = [
        0, 1, 2,
        3, 2, 1,
    ];

    this.normals = [
        0,0,1,
        0,0,1,
        0,0,1,
        0,0,1
    ];

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
