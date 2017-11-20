function ComboAnimation(scene, animations){
    this.scene = scene;
    this.animations = animations;
    this.currentAnimation = 0;
    this.animationsNumber = this.animations.length;
}
ComboAnimation.prototype.constructor = ComboAnimation;


ComboAnimation.prototype.update = function(deltaT){

    if(this.ended)
        return;

    var animation = this.animations[this.currentAnimation];
    console.info(animation);
    animation.update(deltaT);
    console.info(animation);

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