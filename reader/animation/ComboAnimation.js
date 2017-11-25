function ComboAnimation(scene, animations){
    Animation.call(this, scene);
    this.scene = scene;
    this.animations = animations;
    this.currentAnimation = 0;
    this.animationsNumber = this.animations.length;
}
ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.update = function(currTime){
    if( this.currentAnimation < this.animationsNumber){
        
        var animation = this.animations[this.currentAnimation];

        animation.update(currTime);
        
        if (animation.ended && this.currentAnimation+1 < this.animationsNumber){
            this.currentAnimation += 1;
        }
    } else {
        this.ended = true;
    }
};

ComboAnimation.prototype.display = function(){
    var animation = this.animations[this.currentAnimation];
    animation.display();
};