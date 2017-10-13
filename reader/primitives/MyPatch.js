/**
 * MyPatch
 * @constructor
 */
function MyPatch(scene, uDegree, vDegree) {
    CGFobject.call(this,scene);

    this.uDegree = uDegree;
    this.vDegree = vDegree;


    this.setTextureCoords();

    // init buffers
    this.initBuffers();
}

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.initBuffers = function() {



    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

    var v = new Array();
    for (var i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (var i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
}

MyPatch.prototype.makeSurface = function (id, degree1, degree2, controlvertexes, translation) {

    var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
    var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

    var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };

    var obj = new CGFnurbsObject(this, getSurfacePoint, 20, 20 );
    this.surfaces.push(obj);
}



MyPatch.prototype.scaleTexCoords = function(ampS, ampT) {
    for(var i = 0; i < this.texCoords.length; i+=2){
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i+1] = this.texCoords[i+1] / ampT;
    }

    this.updateTexCoordsGLBuffers();
};
