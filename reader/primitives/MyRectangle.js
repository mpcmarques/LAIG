/**
 * MyRectangle
 * @param scene     Scene.
 * @param minX      Min x coord.
 * @param maxY      Max y coord.
 * @param maxX      Max x coord.
 * @param minY      Min y coord.
 * @constructor
 */
function MyRectangle(scene, minX, maxY, maxX, minY) {
    CGFobject.call(this,scene);

    //MINX = MINX
    this.minX = minX || 0;
    this.maxX = maxX || 1;
    this.minY = minY || 0;
    this.maxY = maxY || 1;


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

/**
 * Sets initial texture coords.
 */
MyRectangle.prototype.setTextureCoords = function(){
    this.texCoords = [
        this.minX,  this.minY,
        this.maxX, this.minY,
        this.minX,  this.maxY,
        this.maxX, this.maxY
    ]
};

/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MyRectangle.prototype.scaleTexCoords = function(ampS, ampT) {
    for(var i = 0; i < this.texCoords.length; i+=2){
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i+1] = this.texCoords[i+1] / ampT;
    }

    this.updateTexCoordsGLBuffers();
};
