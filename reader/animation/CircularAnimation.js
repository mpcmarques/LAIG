function CircularAnimation(scene, speed, center, radius, startang, rotang) {
    Animation.call(this, scene);

    var DEGREE_TO_RAD = Math.PI / 180;
    this.controlPoints = controlPoints;
    this.speed = speed;
    this.center = center;
    this.radius = radius;
    this.startang = DEGREE_TO_RAD * startang;
    this.rotang = DEGREE_TO_RAD * rotang;


}

CircularAnimation.prototype = Object.create(Animation);
CircularAnimation.prototype.constructor =  CircularAnimation;

CircularAnimation.prototype.animate = function(currTime){

    var currang = this.startang;

    while(currang < (this.startang + this.rotang)){
        this.center[0] = this.radius * Math.sin(currang);
        this.center[2] = this.radius * Math.cos(currang);
        currang += this.speed;
    }



};

CircularAnimation.prototype.update = function(currTime) {
    this.animate(currTime);
};

CircularAnimation.prototype.display = function() {
    this.scene.translate(this.center[0],this.center[1],this.center[2]);
};
