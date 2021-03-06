/**
 * MySphere
 * @param scene Scene.
 * @param arg   MySphere arguments.
 * @constructor
 */
function MySphere(scene,arg) {
    MyPrimitive.call(this, scene);

    this.radius = arg[0];
    this.slices = arg[1];
    this.stacks = arg[2];


    this.initBuffers();
}

MySphere.prototype = Object.create(MyPrimitive.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function()
{


    this.vertices = [];

    this.indices = [];

    this.normals = [];

    this.texCoords = [];

    var teta = 2 * Math.PI / this.slices;

    var angHor = Math.PI / this.stacks;

    var vertice=0;

    for(var i = 0; i <= this.slices; i++)
    {
        for(var k = 0; k <= this.stacks; k++)
        {
            var x = Math.cos(teta * i) * Math.sin(angHor * k);
            var y = Math.sin(teta * i) * Math.sin(angHor * k);
            var z = Math.cos(angHor * k);


            this.normals.push(x,y,z);
            this.vertices.push(this.radius * x, this.radius* y, this.radius * z);
            this.texCoords.push(k / this.slices, 1 - i / this.stacks);
            vertice++;


            if (i > 0 && k > 0) {
                this.myIndices(vertice,this.stacks);
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


MySphere.prototype.myIndices = function(verticeNumber, stacks)
{
    this.indices.push(verticeNumber- stacks - 1,verticeNumber - 1, verticeNumber - stacks - 2);
    this.indices.push(verticeNumber - 1, verticeNumber - 2,verticeNumber - stacks - 2);
};


/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MySphere.prototype.scaleTexCoords = function(ampS, ampT) {
    this.updateTexCoordsGLBuffers();
};