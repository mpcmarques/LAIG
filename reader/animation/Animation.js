var Animation = function(scene) {
    this.scene = scene;
};

Animation.prototype.constructor = Animation;

Animation.prototype.update = function(deltaT){
    console.log(deltaT);
};

Animation.prototype.display = function() {
    console.warn("Animation Display need to be implemented!");
};
