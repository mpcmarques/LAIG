/**
 * MyTriangle
 * @param scene     Scene.
 * @param vector    Arguments vector.
 * @constructor
 */
function MyTriangle(scene, vector) {
    MyPrimitive.call(this, scene);

    this.vector = vector;

    if(vector.length !== 9)
        console.warn('The triangle needs to have 9 coords');

    this.initBuffers();
}

MyTriangle.prototype = Object.create(MyPrimitive.prototype);
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

    var a = Math.sqrt(
        Math.pow(this.vector[0] - this.vector[6],2) +
        Math.pow(this.vector[1] - this.vector[7],2) +
        Math.pow(this.vector[2] - this.vector[8],2)
    );

    var b = Math.sqrt(
        Math.pow(this.vector[3] - this.vector[0],2) +
        Math.pow(this.vector[4] - this.vector[1],2) +
        Math.pow(this.vector[5] - this.vector[2],2)
    );

    var c = Math.sqrt(
        Math.pow(this.vector[6] - this.vector[3],2) +
        Math.pow(this.vector[7] - this.vector[4],2) +
        Math.pow(this.vector[8] - this.vector[5],2)
    );

    var cosBeta =  (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c,2)) / (2 * a * c);
    var beta  = Math.acos(cosBeta);

    this.texCoords = [
        0,0,
        c,0,
        c - a * cosBeta, a * Math.sin(beta)
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MyTriangle.prototype.scaleTexCoords = function (ampS, ampT) {
    for(var i = 0; i < this.texCoords.length; i+=2){
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i+1] = this.texCoords[i+1] / ampT;
    }

    this.updateTexCoordsGLBuffers();
};

