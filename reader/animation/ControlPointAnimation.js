var ControlPointAnimation = function(scene, speed, controlPoints) {
  Animation.call(this, scene, speed);

  this.controlPoints = controlPoints;
  this.currentControlPoint = 0;
  this.point = controlPoints[0].splice();
};

ControlPointAnimation.prototype = Object.create(Animation.prototype);
ControlPointAnimation.prototype.constructor = ControlPointAnimation;
