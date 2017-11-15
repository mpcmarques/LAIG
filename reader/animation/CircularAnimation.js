function CircularAnimation(scene, speed, center, radius, startang, rotang) {
  Animation.call(this, scene, (Math.PI/180) * speed);

  var DEGREE_TO_RAD = Math.PI / 180;
  this.center = center;
  this.radius = radius;
  this.startang = DEGREE_TO_RAD * startang;
  this.rotang = DEGREE_TO_RAD * rotang;
  this.point = [];
  this.end = false;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor =  CircularAnimation;

CircularAnimation.prototype.animate = function(currTime){
  if(!this.end){

    if(this.currentTime != null){

      var startTime = ((currTime - this.currentTime) / 1000.0);

      var currang = this.startang;




      this.point[0] =  this.center[0] + this.radius * Math.sin(currang);
      this.point[1] =  this.center[2] + this.radius * Math.cos(currang);
      this.startang += startTime * this.speed;


    }
    this.currentTime = currTime;

    if(this.startang >= this.rotang)
    this.end = true;

  }
};

CircularAnimation.prototype.update = function(currTime) {
  this.animate(currTime);
};

CircularAnimation.prototype.display = function() {
  this.scene.translate(this.point[0],this.center[1],this.point[1]);
  this.scene.rotate(Math.PI / 2 + this.startang, 0, 1, 0);
};
