function LinearAnimation(scene, controlPoints, speed) {
    Animation.call(this, scene);

    this.controlPoints = controlPoints;
    this.speed = speed;

    this.point = [];
    this.point[0] = controlPoints[0][0];
    this.point[1] = controlPoints[0][1];
    this.point[2] = controlPoints[0][2];
    this.currentControlPoint = 0;
    this.ended = false;
}

LinearAnimation.prototype = Object.create(Animation);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.animate = function (currTime) {

    if (this.ended)
        return;

    if (this.initialTime == null)
        this.initialTime = currTime;

    // delta T
    var deltaT = ((currTime - this.initialTime) / 1000);

    // TODO -> MOVIMENTO PARA TRAS

    // X = Xo + v * t.
    this.point[0] = this.controlPoints[this.currentControlPoint][0] + deltaT * this.speed;
    this.point[2] = this.controlPoints[this.currentControlPoint][2] + deltaT * this.speed;

    if (this.point[2] >= this.controlPoints[this.currentControlPoint + 1][2] &&
        this.point[0] >= this.controlPoints[this.currentControlPoint + 1][2]) {
        this.currentControlPoint += 1;
        this.initialTime = currTime;
    }

    if (this.currentControlPoint == this.controlPoints.length - 1)
        this.ended = true;
};

LinearAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

LinearAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], 0, this.point[2]);
};
