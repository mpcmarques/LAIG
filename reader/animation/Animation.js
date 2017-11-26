/**
* Animation's abstract superclass.
*/
var Animation = function(scene) {
    this.scene = scene;
    this.ended = false;
};

Animation.prototype.constructor = Animation;

/**
 * Update function, needs to be implemented in subclass.
 * @param deltaT Current time.
 */
Animation.prototype.update = function(deltaT){
    console.warn("update need to be implemented!");
};

/**
 * Displays the animation, needs to be implemented in subclass.
 */
Animation.prototype.display = function() {
    console.warn("Animation Display need to be implemented!");
};
