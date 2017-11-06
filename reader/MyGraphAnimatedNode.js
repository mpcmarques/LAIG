function MyGraphAnimatedNode(graph, nodeID, animationID) {
    MyGraphNode.call(this, graph, nodeID);

    this.animationID = animationID;
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

MyGraphAnimatedNode.prototype = MyGraphNode.prototype;
MyGraphAnimatedNode.prototype.constructor = MyGraphAnimatedNode;

