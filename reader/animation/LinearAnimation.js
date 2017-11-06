function LinearAnimation (scene, controlPoints, speed) {
    Animation.call(this, scene);

    this.controlPoints = controlPoints;
    this.speed = speed;

    this.point = controlPoints[0];
    this.currentControlPoint = 0;
    this.ended = false;
}

LinearAnimation.prototype = Object.create(Animation);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.animate = function(currTime){

    if(this.ended)
        return;

    if(this.currentTime == null)
        this.currentTime = currTime;

    var deltaT = ((currTime - this.currentTime)/1000);
    var distanceX = this.controlPoints[this.currentControlPoint+1][0] - this.point[0];
    var distanceZ = this.controlPoints[this.currentControlPoint+1][1] - this.point[1];
    
    this.point[0] += distanceX * deltaT;
    this.point[1] += distanceZ * deltaT;

    if(this.point >= this.controlPoints[this.currentControlPoint+1]) {
        this.point = this.controlPoints[this.currentControlPoint+1];
        this.currentControlPoint += 1;
    }

    console.log(this.currentControlPoint);

    if(this.currentControlPoint == this.controlPoints.length-1)
        this.ended = true;

    console.log(this.point);
};

LinearAnimation.prototype.update = function(currTime) {
   this.animate(currTime);
};

LinearAnimation.prototype.display = function() {
    this.scene.translate(this.point[0], 0, this.point[1]);
};

