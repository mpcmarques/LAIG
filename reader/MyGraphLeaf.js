/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @param graph     Scene graph.
 * @param xmlelem   XML (LSX) Element.
 * @param type      Leaf type.
 * @param args      Leaf arguments.
 * @constructor
 */
function MyGraphLeaf(graph, xmlelem, type, args) {
    this.graph = graph;
    this.xmlelem = xmlelem;
    this.type = type;
    this.args = args;
}

