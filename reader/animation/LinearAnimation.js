function LinearAnimation (scene, controlPoints, speed) {
    Animation.call(this, scene);

    this.controlPoints = controlPoints;
    this.speed = speed;
    this.speedPerControlPoint = controlPoints.length / speed;

    this.point = controlPoints[0];
    this.currentControlPoint = 0;
}

LinearAnimation.prototype = Object.create(Animation);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.animate = function(){

    if(this.point[this.currentControlPoint] < this.controlPoints[this.currentControlPoint+1][this.currentControlPoint]){
        this.point[0] += this.speedPerControlPoint;
    }

    if(this.point[this.currentControlPoint+2] < this.controlPoints[this.currentControlPoint+1][this.currentControlPoint+2]){
        this.point[2] += this.speedPerControlPoint;
    }

    if(this.point[0] == this.controlPoints[1][0]
        && this.point[2] == this.controlPoints[1][2]){

        this.currentControlPoint += 1;
    }
};

