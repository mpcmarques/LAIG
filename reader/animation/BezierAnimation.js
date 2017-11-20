function BezierAnimation(scene, controlPoints, speed) {
    ControlPointAnimation.call(this, scene, speed, controlPoints);

    this.actualx = this.point[0];
    this.actualy = this.point[2];
    this.inicialX = this.controlPoints[0][0];
    this.incialY = this.controlPoints[0][1];
    this.inicialZ = this.controlPoints[0][2];
    this.aux = 0.0;
    console.log(this.lenght(this.controlPoints));
}

BezierAnimation.prototype = Object.create(ControlPointAnimation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.animate = function (currTime) {
//x = (1−t)2 * 0 + 2(1−t)t * 0.5 + t2 * 1 = (1-t)t + t2 = t
//y = (1−t)2 * 0 + 2(1−t)t * 1 + t2 * 0 = 2(1-t)t = –t2 + 2t


            if(this.aux > this.lenght(this.controlPoints))
            {
              this.ended = true;
            }

  if(!this.ended) {

      if (this.inicialTime == null) {
          this.inicialTime = currTime;
      }
      var deltaTime = ((currTime - this.inicialTime) / 1000.0);
      var radius = Math.sqrt(Math.pow(this.point[0], 2) + Math.pow(this.point[2], 2));


      this.aux = this.bezier(this.controlPoints, deltaTime * this.speed / this.length(this.controlPoints));
      /* if(isNaN(radius))
           this.bezier(this.controlPoints,deltaTime * this.speed) ;
       else
           this.bezier(this.controlPoints,deltaTime * this.speed /radius) ;
*/

  }
    this.currentTime = currTime;
};

BezierAnimation.prototype.update = function (currTime) {
    this.animate(currTime);
};

BezierAnimation.prototype.length = function (controlPoints) {


    var L2 = [];
      L2 = this.addArray2(controlPoints[0] , controlPoints[1]);

    var H = this.addArray2(controlPoints[1],controlPoints[2]);
    var L3 = this.addArray2(L2,H);
    var R3 = this.addArray2(controlPoints[2],controlPoints[3]);
    var R2 = this.addArray2(H , R3);
    var R1 = this.addArray2(L3 , R2);


   var sum =  this.distance(controlPoints[0],L2);
    sum += this.distance(L2,L3);
    sum += this.distance(L3,R1);
    sum += this.distance(R1,R2);
    sum += this.distance(R2, R3);
    sum += this.distance(R3, controlPoints[3]);


    return sum;
};

BezierAnimation.prototype.distance = function (firstArray, secondArray) {

    return Math.sqrt(Math.pow(secondArray[0] - firstArray[0],2)+ Math.pow(secondArray[1] - firstArray[1],2) + Math.pow(secondArray[2] - firstArray[2],2));

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


    return Math.sqrt(Math.pow(this.point[0],2) + Math.pow(this.point[2],2));
};

BezierAnimation.prototype.display = function () {
    this.scene.translate(this.point[0], this.point[1], this.point[2]);
    //var radius = Math.sqrt(Math.pow(this.point[0],2) + Math.pow(this.point[2],2));
    //var angle = Math.acos(this.point[0]/radius);
    var angle = Math.atan2(this.point[0],this.point[2]);
    this.scene.rotate(angle, 0, 1, 0);
};
