function ComboAnimation(scene, animations){
    this.scene = scene;
    this.animations = animations;
    this.currentAnimation = 0;
    this.animationsNumber = this.animations.length;
}
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.update = function(currTime){

    if(this.ended)
        return;

    var animation = this.animations[this.currentAnimation];

    animation.update(currTime);

    if (animation.ended){
        this.currentAnimation += 1;
    }

    if(this.currentAnimation == this.animationsNumber) {
        this.ended = true;
    }
};

ComboAnimation.prototype.display = function(){

    if(!this.ended) {
        var animation = this.animations[this.currentAnimation];
        animation.display();
    }
};