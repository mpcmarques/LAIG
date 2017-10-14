/**
 * MyPatch
 * @constructor
 */
function MyPatch(scene, args) {
    CGFobject.call(this,scene);

    this.cpoints = args[2];
    this.uDivs = args[0];
    this.vDivs = args[1];

    // create surface
    this.surface = this.makeSurface("1", this.uDivs, this.vDivs, this.cpoints);

    CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, this.uDivs, this.vDivs);
}

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

    var v = new Array();
    for (var i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (var i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
};

MyPatch.prototype.getSurfacePoint = function (u,v){
    return this.surface.getPoint(u,v)
};

MyPatch.prototype.makeSurface = function (id, degree1, degree2, controlvertexes) {
    var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
    var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions


    // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
    return new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
};



MyPatch.prototype.scaleTexCoords = function(ampS, ampT) {
    for(var i = 0; i < this.texCoords.length; i+=2){
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i+1] = this.texCoords[i+1] / ampT;
    }

    this.updateTexCoordsGLBuffers();
};
