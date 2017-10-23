var position = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

position.prototype.constructor = position;

var Element = function(position){
    this.position = position;
};

Element.prototype.constructor = Element;

