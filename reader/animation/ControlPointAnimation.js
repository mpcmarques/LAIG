/**
* Abstract class, represent an animation that needs control points.
*/
var ControlPointAnimation = function(scene, speed, controlPoints) {
  Animation.call(this, scene);

  this.speed = speed;
  this.controlPoints = controlPoints;
  this.currentControlPoint = 0;
  this.position = new Position(controlPoints[0].x , controlPoints[0].y, controlPoints[0].z);

};

ControlPointAnimation.prototype = Object.create(Animation.prototype);
ControlPointAnimation.prototype.constructor = ControlPointAnimation;