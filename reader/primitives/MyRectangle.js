/**
 * MyRectangle
 * @constructor
 */
function MyRectangle(scene, minX, maxY, maxX, minY, deltaS, deltaT) {
    CGFobject.call(this,scene);

    //MINX = MINX
    this.minX = minX || 0;
    this.maxX = maxX || 1;
    this.minY = minY || 0;
    this.maxY = maxY || 1;
    this.deltaS = deltaS || 1;
    this.deltaT = deltaT || 1;


    this.setTextureCoords();

    // init buffers
    this.initBuffers();
}

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function() {

    this.vertices = [
        -this.minX, -this.minY, 0,
        this.maxX, -this.minY, 0,
        -this.minX, this.maxY, 0,
        this.maxX, this.maxY, 0
    ];

    this.indices = [
        0, 1, 2,
        3, 2, 1
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

MyRectangle.prototype.setTextureCoords = function(){
    this.texCoords = [
        0,  0,
        this.deltaS, 0,
        0,  this.deltaT,
        this.deltaS, this.deltaT
    ]
};
