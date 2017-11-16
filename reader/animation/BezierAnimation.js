function BezierAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);

    this.actualx = this.point[0];
    this.actualy = this.point[2];
    this.inicialX = this.controlPoints[0][0];
    this.incialY = this.controlPoints[0][1];
    this.inicialZ = this.controlPoints[0][2];
    this.aux = 0.0;
}

BezierAnimation.prototype = Object.create(ControlPointAnimation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.animate = function (currTime) {
//x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
//y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –t2 + 2t

            if((this.point[2] <0 || this.point[0] <0) || this.point[1]<0)
            {
              this.ended=true;

            }

  if(!this.ended)


        if(this.inicialTime == null)
        {
            this.inicialTime = currTime;
        }
        var deltaTime = ((currTime - this.inicialTime) / 1000.0);
        var radius = Math.sqrt(Math.pow(this.point[0],2) + Math.pow(this.point[2],2));


    this.bezier(this.controlPoints,deltaTime * this.speed);
       /* if(isNaN(radius))
            this.bezier(this.controlPoints,deltaTime * this.speed) ;
        else
            this.bezier(this.controlPoints,deltaTime * this.speed /radius) ;
*/




    this.currentTime = currTime;
};

BezierAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

BezierAnimation.prototype.bezier = function(controlPoints, t) {
    //var  P1 = pInicio;
    //var  P2 = 6 UNIDADES DE DISTANCIA DA POSICAO INICIAL, FRENTE DO SUBMARINE
    // 	P3 = 3 UNIDADES ACIMA DO ALVO, NA VERTICAL
    // 	P4 = POSICAO DO ALVO
    //console.log(t);



    var cX = 3 * (controlPoints[1][0] - controlPoints[0][0]),
        bX = 3 * (controlPoints[2][0] - controlPoints[1][0]) - cX,
        aX = controlPoints[3][0] - controlPoints[0][0] - cX - bX;

    var cY = 3 * (controlPoints[1][1] - controlPoints[0][1]),
        bY = 3 * (controlPoints[2][1] - controlPoints[1][1]) - cY,
        aY = controlPoints[3][1] - controlPoints[0][1] - cY - bY;

    var cZ = 3 * (controlPoints[1][2] - controlPoints[0][2]),
        bZ = 3 * (controlPoints[2][2] - controlPoints[1][2]) - cZ,
        aZ = controlPoints[3][2] - controlPoints[0][2] - cZ - bZ;

    this.point[0] = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + controlPoints[0][0];
    this.point[1] = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + controlPoints[0][1];
    this.point[2] = (aZ * Math.pow(t, 3)) + (bZ * Math.pow(t, 2)) + (cZ * t) + controlPoints[0][2];
};

BezierAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], this.point[1], this.point[2]);
    //var radius = Math.sqrt(Math.pow(this.point[0],2) + Math.pow(this.point[2],2));
    //var angle = Math.acos(this.point[0]/radius);
    var angle = Math.atan2(this.point[0],this.point[2]);
    this.scene.rotate(angle, 0, 1, 0);
};
