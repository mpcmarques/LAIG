function LinearAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);
    this.angle = 0;
    this.initialAngle = 0;
    this.nextAngle = 0;
}

LinearAnimation.prototype = Object.create(ControlPointAnimation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

LinearAnimation.prototype.animate = function (currTime) {
    this.move(currTime);
};

LinearAnimation.prototype.move = function (currTime) {
    if (this.ended)
    return;
    
    if (this.initialTime == null)
    this.initialTime = currTime;
    
    // delta T
    var deltaT = ((currTime - this.initialTime) / 1000);
    var nextPoint = this.controlPoints[this.currentControlPoint + 1];
    var lastPoint = this.controlPoints[this.currentControlPoint];
    
    // chooses front or back movement
    var Xsign, Zsign, Ysign;
    if (lastPoint[0] - nextPoint[0] < 0)
    Xsign = 1;
    else
    Xsign = -1;
    
    if (lastPoint[2] - nextPoint[2] < 0)
    Zsign = 1;
    else
    Zsign = -1;
    
    if(lastPoint[1] - nextPoint[1] < 0)
    Ysign = 1;
    else
    Ysign = -1;
    
    // check if arrived at a control point final coordinate
    var xArrived = false, zArrived = false, yArrived = false;
    if (Xsign == 1) {
        if (this.point[0] >= nextPoint[0])
        xArrived = true;
    } else {
        if (this.point[0] <= nextPoint[0])
        xArrived = true;
    }
    
    if (Zsign == 1) {
        if (this.point[2] >= nextPoint[2])
        zArrived = true;
    } else {
        if (this.point[2] <= nextPoint[2])
        zArrived = true;
    }
    
    if(Ysign  == 1){
        if(this.point[1] >= nextPoint[1])
        yArrived = true;
    } else {
        if (this.point[1] <= nextPoint[1])
        yArrived = true;
    }
    
    // X = Xo + v * t if not arrived yet.
    if (!xArrived)
    this.point[0] = lastPoint[0] + Xsign * deltaT * this.speed;
    
    if (!zArrived)
    this.point[2] = lastPoint[2] + Zsign * deltaT * this.speed;
    
    if(!yArrived)
    this.point[1] = lastPoint[1] + Ysign * deltaT * this.speed;
    
    // arrived at next control points, change the current.
    if (xArrived && zArrived && yArrived) {
        this.currentControlPoint += 1;
        this.initialTime = currTime;
        this.point[0] = nextPoint[0];
        this.point[1] = nextPoint[1];
        this.point[2] = nextPoint[2];
    }
    
    this.rotate(deltaT);
    
    if (this.currentControlPoint == this.controlPoints.length - 1)
    this.ended = true;
};

LinearAnimation.prototype.rotate = function(deltaT){
    
    var nextPoint = this.controlPoints[this.currentControlPoint+1]
    var nextOtherPoint = this.controlPoints[this.currentControlPoint+2]
    
    if (nextPoint != null && nextOtherPoint != null){
        var dx = nextOtherPoint[0] - nextPoint[1];
        var dz = nextOtherPoint[2] - nextPoint[2];
        
        this.nextAngle = Math.atan2(dx,dz);
    }
    
    var angleSign;
    if (this.nextAngle > this.angle)
        angleSign = 1;
    else if (this.nextAngle == this.angle)
        angleSign = 0;
    else if (this.nextAngle < this.angle)
        angleSign = -1;
    
    this.angle = this.initialAngle + angleSign * this.speed * deltaT;

    // TODO: CONTINUE FROM THIS.
    
};

LinearAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], this.point[1], this.point[2]);
    this.scene.rotate(this.angle, 0, 1, 0);
};
