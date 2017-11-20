function CircularAnimation(scene, speed, center, radius, startang, rotang) {
    Animation.call(this, scene, (Math.PI / 180) * speed);

    var DEGREE_TO_RAD = Math.PI / 180;
    this.center = center;
    this.radius = radius;
    this.startang = DEGREE_TO_RAD * startang;
    this.rotang = DEGREE_TO_RAD * rotang;
    this.initialAngle = this.startang;
    this.point = [];
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.animate = function (currTime) {
    if (this.ended)
        return;

    if (this.initialTime == null)
        this.initialTime = currTime;


    var startTime = ((currTime - this.initialTime) / 1000.0);

    var currang = this.startang;

    this.point[0] = this.center[0] + this.radius * Math.sin(currang);
    this.point[1] = this.center[2] + this.radius * Math.cos(currang);
    this.startang = this.initialAngle + startTime * this.speed;


    if (this.startang >= this.rotang)
        this.ended = true;

};

CircularAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

CircularAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], this.center[1], this.point[1]);
    this.scene.rotate(Math.PI / 2 + this.startang, 0, 1, 0);
};
