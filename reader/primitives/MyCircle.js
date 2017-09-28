/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircle(scene, slices) {
    CGFobject.call(this,scene);

    this.scene = scene;
    this.slices = slices;

    this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor=MyCircle;

MyCircle.prototype.initBuffers = function ()
{

    this.vertices = [];
    this.indices = [];
    this.texCoords = [];

    var teta = 2 * Math.PI / this.slices;

    var n_ver = 0;

    this.vertices.push(0,0,0);

    this.texCoords.push(0.5,0.5);

    for(i = 0; i < this.slices; i++)
    {
        this.texCoords.push(0.5 * (Math.cos(n_ver) + 1) ,0.5 * (1 - Math.sin(n_ver)));

        this.vertices.push(0.5 * Math.cos(n_ver), 0.5 * Math.sin(n_ver), 0);

        n_ver = teta * (i + 1);
    }

    n_ver = 1;

    for(var i = 0; i < this.slices; i++)
    {
        if(i != this.slices - 1)
        {
            this.indices.push(0, n_ver, (n_ver + 1));

            n_ver = n_ver + 1;;
        }
        else
            this.indices.push(0, n_ver, 1);
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
