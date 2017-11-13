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

    // chooses front or back movement
    var Xsign, Zsign;
    if(this.controlPoints[this.currentControlPoint][0] - this.controlPoints[this.currentControlPoint+1][0] < 0)
        Xsign = 1;
    else
        Xsign = -1;

    if(this.controlPoints[this.currentControlPoint][2] - this.controlPoints[this.currentControlPoint+1][2] < 0)
        Zsign = 1;
    else
        Zsign = -1;

    // check if arrived at a control point final coordinate
    var xArrived = false, zArrived = false;
    if(Xsign == 1){
        if (this.point[0] >= this.controlPoints[this.currentControlPoint + 1][0])
            xArrived = true;
    } else {
        if (this.point[0] <= this.controlPoints[this.currentControlPoint + 1][0])
            xArrived = true;
    }

    if(Zsign == 1){
        if (this.point[2] >= this.controlPoints[this.currentControlPoint +1][2])
            zArrived = true;
    } else {
        if (this.point[2] <= this.controlPoints[this.currentControlPoint +1][2])
            zArrived = true;
    }

    // X = Xo + v * t if not arrived yet.
    if(!xArrived)
        this.point[0] = this.controlPoints[this.currentControlPoint][0] + Xsign * deltaT * this.speed;

    if(!zArrived)
        this.point[2] = this.controlPoints[this.currentControlPoint][2] + Zsign * deltaT * this.speed;

    // arrived at next control points, change the current.
    if(xArrived && zArrived){
        this.currentControlPoint += 1;
        this.initialTime = currTime;
    }

    if (this.currentControlPoint == this.controlPoints.length - 1)
        this.ended = true;

    console.log(this.point, xArrived, zArrived);
};

LinearAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

LinearAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], 0, this.point[2]);
};
