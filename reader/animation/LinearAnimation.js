function LinearAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);
}

LinearAnimation.prototype = Object.create(ControlPointAnimation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

LinearAnimation.prototype.animate = function (currTime) {
    this.move(currTime);
};

LinearAnimation.prototype.move = function(currTime){
    if (this.ended)
        return;

    if (this.initialTime == null)
        this.initialTime = currTime;

    // delta T
    var deltaT = ((currTime - this.initialTime) / 1000);
    var nextPoint = this.controlPoints[this.currentControlPoint+1];
    var lastPoint = this.controlPoints[this.currentControlPoint];

    // chooses front or back movement
    var Xsign, Zsign;
    if(lastPoint[0] - nextPoint[0] < 0)
        Xsign = 1;
    else
        Xsign = -1;

    if(lastPoint[2] - nextPoint[2] < 0)
        Zsign = 1;
    else
        Zsign = -1;

    // check if arrived at a control point final coordinate
    var xArrived = false, zArrived = false;
    if(Xsign == 1){
        if (this.point[0] >= nextPoint[0])
            xArrived = true;
    } else {
        if (this.point[0] <= nextPoint[0])
            xArrived = true;
    }

    if(Zsign == 1){
        if (this.point[2] >= nextPoint[2])
            zArrived = true;
    } else {
        if (this.point[2] <= nextPoint[2])
            zArrived = true;
    }

    // X = Xo + v * t if not arrived yet.
    if(!xArrived)
        this.point[0] = lastPoint[0] + Xsign * deltaT * this.speed;

    if(!zArrived)
        this.point[2] = lastPoint[2] + Zsign * deltaT * this.speed;

    // arrived at next control points, change the current.
    if(xArrived && zArrived){
        this.currentControlPoint += 1;
        this.initialTime = currTime;
    }

    if (this.currentControlPoint == this.controlPoints.length - 1)
        this.ended = true;
};

LinearAnimation.prototype.display = function () {
    // Dx and Dz
    //var dx = this.point[0] - this.controlPoints[this.currentControlPoint][0];
   // var dz = this.point[2] - this.controlPoints[this.currentControlPoint][2];
   // var angle = Math.atan2(dx, dz);
    var radius = Math.sqrt(Math.pow(this.point[0],2) + Math.pow(this.point[2],2));
    var angle = Math.acos(this.point[0]/radius);
    this.scene.translate(this.point[0], 0, this.point[2]);
    this.scene.rotate(angle, 0, 1, 0);
};
