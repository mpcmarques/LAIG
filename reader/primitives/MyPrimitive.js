function MyPrimitive (scene) {
    CGFobject.call(this, scene);

    this.scene = scene;
}

MyPrimitive.prototype = Object.create(CGFobject.prototype);
MyPrimitive.prototype.constructor=MyPrimitive;

MyPrimitive.prototype.scaleTexCoords = function () {
    console.warn("MyPrimitive subclass - you should implement this function.");
};