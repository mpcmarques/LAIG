/**
* Animation's abstract superclass.
*/
var Animation = function(scene) {
    this.scene = scene;
    this.ended = false;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(deltaT){
    console.warn("update need to be implemented!");
};

Animation.prototype.display = function() {
    console.warn("Animation Display need to be implemented!");
};
