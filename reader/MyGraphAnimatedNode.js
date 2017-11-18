function MyGraphAnimatedNode(graph, nodeID, animationID) {
    MyGraphNode.call(this, graph, nodeID);

    this.animationID = animationID;
}

MyGraphAnimatedNode.prototype = MyGraphNode.prototype;
MyGraphAnimatedNode.prototype.constructor = MyGraphAnimatedNode;

