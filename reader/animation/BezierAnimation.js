/**
 * BezierAnimation
 * @param scene Scene.
 * @param controlPoints  Control Points.
 * @param speed  Speed.
 * @constructor
 */
function BezierAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);
    
    this.timeExpected = this.length(this.controlPoints) / this.speed;
}

BezierAnimation.prototype = Object.create(ControlPointAnimation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

/**
 * Perform the animation.
 * @param currTime  Current time.
 */
BezierAnimation.prototype.animate = function (currTime) {
    
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

/**
 * Calculate bezier curve length.
 * @param controlPoints Control Points.
 */
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

/**
 * Add positions
 * @param position1     Position 1
 * @param position2 Position 2
 * @returns {Position}  Position1+Position2
 */
BezierAnimation.prototype.addPositions = function(position1, position2){
    var newPos = new Position(position1.x, position1.y, position1.z);
    newPos.addPosition(position2);
    return newPos;
};

BezierAnimation.prototype.addPositions2 = function(position1, position2){
    return new Position(
        (position1.x + position2.x)/2,
        (position1.y + position2.y)/2,
        (position1.z + position2.z)/2
    );
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
};

BezierAnimation.prototype.display = function () {
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    var angle = Math.atan2(this.position.x,this.position.z);
    this.scene.rotate(angle, 0, 1, 0);
};
