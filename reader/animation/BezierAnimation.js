function BezierAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);
    
    this.timeExpected = this.length(this.controlPoints) / this.speed;
}

BezierAnimation.prototype = Object.create(ControlPointAnimation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.animate = function (currTime) {
//x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
//y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –t2 + 2t



  if(!this.ended) {

      if (this.inicialTime == null) {
          this.inicialTime = currTime;
      }
      var deltaTime = ((currTime - this.inicialTime) / 1000.0);
      var radius = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.z, 2));

      this.bezier(this.controlPoints, deltaTime * this.speed / this.length(this.controlPoints));

      if(this.timeExpected < deltaTime)
      {
          this.ended = true;
      }

  }
};

BezierAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

BezierAnimation.prototype.length = function (controlPoints) {


    var L2 = this.addPositions(controlPoints[0], controlPoints[1]);
    var H = this.addPositions(controlPoints[1],controlPoints[2]);
    var L3 = this.addPositions2(L2,H);
    var R3 = this.addPositions(controlPoints[2],controlPoints[3]);
    var R2 = this.addPositions2(H , R3);
    var R1 = this.addPositions2(L3 , R2);

  
   var sum =  controlPoints[0].distanceTo(L2);
    sum += L2.distanceTo(L3);
    sum += L3.distanceTo(R1);
    sum += R1.distanceTo(R2);
    sum += R2.distanceTo(R3);
    sum += R3.distanceTo(controlPoints[3]);


    return sum;
};


BezierAnimation.prototype.addPositions = function(position1, position2){
    var newPos = new Position(position1.x, position1.y, position1.z);
    newPos.addPosition(position2);
    return newPos;
};

BezierAnimation.prototype.addPositions2 = function(position1, position2){
    return new Position(
        position1.x - position2.x,
        position1.y - position2.y,
        position1.z - position2.z
    );
};

BezierAnimation.prototype.subArray = function (firstArray, secondArray) {

    var newArray = [];
    for(var i=0; i<firstArray.length;i++)
    {
       newArray[i] = firstArray[i] - secondArray[i];
    }

    return newArray;
};

BezierAnimation.prototype.addArray = function (firstArray, secondArray) {

    var newArray = [];
    for(var i=0; i<firstArray.length;i++)
    {
        newArray[i] = firstArray[i] + secondArray[i];
    }

    return newArray;
};

BezierAnimation.prototype.addArray2 = function (firstArray, secondArray) {

    var newArray = [];
    for(var i=0; i<firstArray.length;i++)
    {
        newArray[i] = (firstArray[i] + secondArray[i])/2;
    }

    return newArray;
};


BezierAnimation.prototype.bezier = function(controlPoints, t) {

    var cX = 3 * (controlPoints[1].x - controlPoints[0].x),
        bX = 3 * (controlPoints[2].x - controlPoints[1].x) - cX,
        aX = controlPoints[3].x - controlPoints[0].x - cX - bX;

    var cY = 3 * (controlPoints[1].y - controlPoints[0].y),
        bY = 3 * (controlPoints[2].y  - controlPoints[1].y ) - cY,
        aY = controlPoints[3].y - controlPoints[0].y  - cY - bY;

    var cZ = 3 * (controlPoints[1].z - controlPoints[0].z),
        bZ = 3 * (controlPoints[2].z- controlPoints[1].z) - cZ,
        aZ = controlPoints[3].z - controlPoints[0].z - cZ - bZ;

    this.position.x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + controlPoints[0].x;
    this.position.y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + controlPoints[0].y;
    this.position.z = (aZ * Math.pow(t, 3)) + (bZ * Math.pow(t, 2)) + (cZ * t) + controlPoints[0].z;


    return Math.sqrt(Math.pow(this.position.x,2) + Math.pow(this.position.z,2));
};

BezierAnimation.prototype.display = function () {
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    //var radius = Math.sqrt(Math.pow(this.position.x,2) + Math.pow(this.position.z,2));
    //var angle = Math.acos(this.position.x/radius);
    var angle = Math.atan2(this.position.x,this.position.z);
    this.scene.rotate(angle, 0, 1, 0);
};
