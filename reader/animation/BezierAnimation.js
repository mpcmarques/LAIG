function BezierAnimation(scene, controlPoints, speed) {
    Animation.call(this, scene);

    this.controlPoints = controlPoints;
    this.speed = speed;
    this.point = [];
    this.point[0] = controlPoints[0][0];
    this.point[1] = controlPoints[0][1];
    this.point[2] = controlPoints[0][2];
    this.actualx = this.point[0];
    this.actualy = this.point[2];
    this.currentControlPoint = 0;
    this.ended = false;
    this.aux = 0.0;
}

BezierAnimation.prototype = Object.create(Animation);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.animate = function (currTime) {
//x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
//y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –t2 + 2t




    if(this.currentTime != null) {

        var startTime = ((currTime - this.currentTime) / 1000.0);

        var cX = 3 * (this.controlPoints[this.currentControlPoint+1][0]-this.controlPoints[this.currentControlPoint][0]),
            bX = 3 * (this.controlPoints[this.currentControlPoint+2][0]-this.controlPoints[this.currentControlPoint+1][0])-cX,
            aX = this.controlPoints[this.currentControlPoint+3][0] - this.controlPoints[this.currentControlPoint][0]-cX-bX;

        var cY = 3 * (this.controlPoints[this.currentControlPoint+1][1] - this.controlPoints[this.currentControlPoint][1]),
            bY = 3 * (this.controlPoints[this.currentControlPoint+2][1] - this.controlPoints[this.currentControlPoint+1][1]) - cY,
            aY = this.controlPoints[this.currentControlPoint+3][1] - this.controlPoints[this.currentControlPoint][1] - cY - bY;


        var cZ = 3 * (this.controlPoints[this.currentControlPoint+1][2] - this.controlPoints[this.currentControlPoint][2]),
            bZ = 3 * (this.controlPoints[this.currentControlPoint+2][2] - this.controlPoints[this.currentControlPoint+1][2]) - cZ,
            aZ = this.controlPoints[this.currentControlPoint+3][2] - this.controlPoints[this.currentControlPoint][2] - cZ - bZ;

        this.point[0] = (aX * Math.pow(this.aux, 3)) + (bX * Math.pow(this.aux, 2)) + (cX * this.aux) + this.controlPoints[this.currentControlPoint][0];
        this.point[1] = (aY * Math.pow(this.aux, 3)) + (bY * Math.pow(this.aux, 2)) + (cY * this.aux) + this.controlPoints[this.currentControlPoint][1];
        this.point[2] = (aZ * Math.pow(this.aux, 3)) + (bZ * Math.pow(this.aux, 2)) + (cZ * this.aux) + this.controlPoints[this.currentControlPoint][2];
        this.aux += startTime * this.speed;
    }
    this.currentTime = currTime;
};

BezierAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

BezierAnimation.prototype.display = function () {
    console.log(this.point);
    this.scene.translate(this.point[0], this.point[1], this.point[2]);
};
