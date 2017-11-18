/**
 * My Patch
 * @param scene     Scene.
 * @param args      Patch arguments.
 * @constructor
 */
function MyPatch(scene, args) {
    CGFobject.call(this,scene);

    this.cpoints = args[2];
    this.uDivs = args[0];
    this.vDivs = args[1];

    this.degree = this.cpoints.length - 1 ;
    this.degree2 = this.cpoints[0].length - 1;

    // create surface
    var knots1 = this.getKnotsVector(this.degree); // to be built inside webCGF in later versions ()
    var knots2 = this.getKnotsVector(this.degree2); // to be built inside webCGF in later versions

    this.surface = new CGFnurbsSurface(this.degree, this.degree2, knots1, knots2, this.cpoints);

    CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, this.uDivs, this.vDivs);
}

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

    var v = [];
    var i;
    for (i = 0; i <= degree; i++) {
        v.push(0);
    }
    for (i = 0; i <= degree; i++) {
        v.push(1);
    }
    return v;
};

MyPatch.prototype.getSurfacePoint = function (u,v){
    return this.surface.getPoint(u,v);
};

/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MyPatch.prototype.scaleTexCoords = function(ampS, ampT) {

    for(var i = 0; i < this.texCoords.length; i+=2){
        this.texCoords[i] = this.texCoords[i] / ampS;
        this.texCoords[i+1] = this.texCoords[i+1] / ampT;
    }

    this.updateTexCoordsGLBuffers();
};

MyPatch.prototype.display = function() {
    CGFnurbsObject.prototype.display.call(this);
};