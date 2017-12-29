function MyPrimitive (scene) {
    CGFobject.call(this, scene);

    this.isTexturedScaled = false;
    this.scene = scene;

    this.animations = [];
}

MyPrimitive.prototype = Object.create(CGFobject.prototype);
MyPrimitive.prototype.constructor=MyPrimitive;

MyPrimitive.prototype.scaleTexCoords = function(){
    console.warn("This function needs to be implemented.");
};

MyPrimitive.prototype.update = function(currTime){
    // update primitive animations
    for(var i = 0; i < this.animations.length; i++){
        this.animations[i].update(currTime);
    }
};