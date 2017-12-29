function MyPrimitive (scene) {
    CGFobject.call(this, scene);

    this.isTexturedScaled = false;
    this.scene = scene;

    this.animation= null;
}

MyPrimitive.prototype = Object.create(CGFobject.prototype);
MyPrimitive.prototype.constructor=MyPrimitive;

MyPrimitive.prototype.scaleTexCoords = function(){
    console.warn("This function needs to be implemented.");
};

MyPrimitive.prototype.update = function(currTime){
    // update primitive animations
    if(this.animation != null) {
        this.animation.update(currTime);
    }
};