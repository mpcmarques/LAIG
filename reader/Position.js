/**
 * Position
 * @param x X Point.
 * @param y Y Point.
 * @param z Z Point.
 * @constructor
 */

function Position (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Position.prototype.constructor = Position;

Position.prototype.addPosition = function(position){
    this.x += position.x;
    this.y += position.y;
    this.z += position.z;
};

Position.prototype.distanceTo = function(position){ 
    return Math.sqrt(Math.pow(position.x - this.x,2)+ Math.pow(position.y - this.y,2) + Math.pow(position.z - this.z,2));    
};