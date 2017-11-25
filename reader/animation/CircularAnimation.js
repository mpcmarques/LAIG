function CircularAnimation(scene, speed, center, radius, startang, rotang) {
    Animation.call(this, scene);

    this.speed =  speed / radius;
    var DEGREE_TO_RAD = Math.PI / 180;
    this.center = center;
    this.radius = radius;
    this.startang = DEGREE_TO_RAD * startang;
    this.rotang = DEGREE_TO_RAD * rotang;
    this.initialAngle = this.startang;
    this.perim = (2 * Math.PI * this.radius * this.rotang) /  (360 * DEGREE_TO_RAD);
    this.timeExpected = this.perim / this.speed;
    this.currAng = this.rotang / this.timeExpected;
    this.point = [];
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.animate = function (currTime) {

   if(this.ended)
        return;

    if (this.initialTime == null)
        this.initialTime = currTime;


    var startTime = ((currTime - this.initialTime) / 1000.0);
   

    this.point[0] = this.center[0] + this.radius * Math.sin(this.initialAngle);
    this.point[1] = this.center[2] + this.radius * Math.cos(this.initialAngle);
    this.initialAngle += this.currAng;
    


    if(DEGREE_TO_RAD * this.initialAngle >= this.rotang){
        this.initialAngle = this.rotang;
        this.ended = true;
    }




};

CircularAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

CircularAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], this.center[1], this.point[1]);
    this.scene.rotate(Math.atan2(this.point[0],this.point[1]), 0, 1, 0);
};



