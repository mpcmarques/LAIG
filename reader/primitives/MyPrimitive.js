function MyPrimitive (scene) {
    CGFobject.call(this, scene);

    this.isTexturedScaled = false;
    this.scene = scene;
}

MyPrimitive.prototype = Object.create(CGFobject.prototype);
MyPrimitive.prototype.constructor=MyPrimitive;

MyPrimitive.prototype.scaleTexCoords = function(){
    console.warn("This function needs to be implemented.");
};