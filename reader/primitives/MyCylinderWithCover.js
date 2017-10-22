/**
 * MyCylinderWithCover
 * @param scene             Scene.
 * @param height            Height.
 * @param bottomRadius      Bottom radius.
 * @param topRadius         Top radius.
 * @param stacks            Stacks.
 * @param slices            Slices.
 * @param hasBottomCover    Cylinder has bottom cover.
 * @param hasTopCover       Cylinder has top cover.
 * @constructor
 */
function MyCylinderWithCover(scene, height, bottomRadius, topRadius, stacks, slices, hasBottomCover, hasTopCover) {
    CGFobject.call(this, scene);

    this.height = height;

    this.cylinder = new MyCylinder(scene, height, bottomRadius, topRadius, stacks, slices);

    this.hasBottomCover = hasBottomCover;
    this.hasTopCover = hasTopCover;
    this.bottomRadius = bottomRadius;
    this.topRadius = topRadius;

    this.cover = new MyCircle(scene, slices);
}

MyCylinderWithCover.prototype = Object.create(CGFobject.prototype);
MyCylinderWithCover.prototype.constructor = MyCylinderWithCover;

MyCylinderWithCover.prototype.display = function () {
    // Cylinder
    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix();

    // top cover
    if (this.hasTopCover) {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.height);
        this.scene.scale(this.topRadius * 2, this.topRadius * 2, this.topRadius * 2);
        this.cover.display();
        this.scene.popMatrix();
    }

    // bottom cover
    if (this.hasBottomCover) {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(this.bottomRadius * 2, this.bottomRadius * 2, this.bottomRadius * 2);
        this.cover.display();
        this.scene.popMatrix();
    }
};


/**
 * Scale the texture.
 * @param ampS Amplify factor S.
 * @param ampT Amplify factor T.
 */
MyCylinderWithCover.prototype.scaleTexCoords = function (ampS, ampT) {
    this.cylinder.scaleTexCoords(ampS, ampT);

};
