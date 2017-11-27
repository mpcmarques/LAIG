/**
 * CircularAnimation
 * @param scene Scene.
 * @param speed  Speed.
 * @param center Center.
 * @param radius Radius.
 * @param startang Angle where it starts.
 * @param rotang Angle to go through.
 * @constructor
 */


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
    this.position = new Position(0,0,0);
    this.lastPosition = null;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.animate = function (currTime) {

   if(this.ended)
        return;

    if (this.initialTime == null)
        this.initialTime = currTime;

    this.position.x = this.center.z + this.radius * Math.cos(this.initialAngle);
    this.position.z = this.center.x + this.radius * Math.sin(this.initialAngle);

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
  this.scene.translate(this.position.x, this.position.y, this.position.z);

  if(this.lastPosition != null){
    var dx = this.position.x - this.lastPosition.x;
    var dz = this.position.z - this.lastPosition.z;
    //this.scene.rotate(Math.atan2(dx, dz), 0, 1, 0);
  }
};
