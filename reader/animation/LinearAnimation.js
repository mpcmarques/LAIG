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

    // delta T
    if(this.currentTime != null) {
        var deltaT = ((currTime - this.currentTime) / 1000);

        // X = Xo + v * t.
        this.point[0] = this.controlPoints[this.currentControlPoint][0] + deltaT * this.speed;
        this.point[2] = this.controlPoints[this.currentControlPoint][2] + deltaT * this.speed;

        if (this.point[0] >= this.controlPoints[this.currentControlPoint + 1][0]) {
            this.point[0] = this.controlPoints[this.currentControlPoint + 1][0];
        }

        if (this.point[2] >= this.controlPoints[this.currentControlPoint + 1][2]) {
            this.point[2] = this.controlPoints[this.currentControlPoint + 1][2];
        }

        if (this.point[2] >= this.controlPoints[this.currentControlPoint + 1][2] &&
            this.point[0] >= this.controlPoints[this.currentControlPoint + 1][2]) {
            this.currentControlPoint += 1;
        }
    }

    if (this.currentControlPoint == this.controlPoints.length - 1)
        this.ended = true;

    this.currentTime = currTime;
};

LinearAnimation.prototype.update = function(currTime) {
   this.animate(currTime);
};

LinearAnimation.prototype.display = function() {
    this.scene.translate(this.point[0], 0, this.point[2]);
};
