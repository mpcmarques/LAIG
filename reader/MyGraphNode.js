/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @param graph     Scene graph.
 * @param nodeID    Node identifier.
 * @param selectable    Select to apply shaders.
 * @constructor
 */
function MyGraphNode(graph, nodeID, selectable) {
    this.graph = graph;
    this.nodeID = nodeID;

    this.selectable = selectable;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    // IDs of animations
    this.animations = [];

    this.hasAnimation = false;

    this.picked = false;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
};

MyGraphNode.prototype.addAnimation = function (animationID) {
    this.animations.push(animationID);
};

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addChild = function(leaf) {
    this.leaves.push(leaf);
};


