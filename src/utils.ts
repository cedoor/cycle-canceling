import Graph, { Arc } from "./dataStructures/graph"

/**
 * Retrieves the path from the sink node to the source node
 * using the predecessors map.
 * @param {Map<number, number>} Predecessor nodes.
 * @param {number} Sink node.
 * @param {number} Source node.
 * @returns {number[]} Path from the source node to the sink node.
 */
export function retrievePath(predecessors: Map<number, number>, sourceNodeId: number, sinkNodeId: number): number[] {
    // Path starts from the sink node.
    const path = [sinkNodeId]

    // While loop stops when the last path node is the source node.
    while (path[path.length - 1] !== sourceNodeId) {
        path.push(predecessors.get(path[path.length - 1]) as number)
    }

    // Returns a reversed array, ordered from the source to the sink node.
    return path.reverse()
}

/**
 *
 * @param {Graph}
 */
export function setResidualGraph(graph: Graph) {
    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.cost > 0) {
                const adjacentNode = graph.getNode(arc.head)
                const reverseArc = new Arc(node.id, -arc.cost, arc.capacity, arc.flow)

                adjacentNode.addArc(reverseArc)

                if (arc.capacity > arc.flow) {
                    arc.flow = arc.capacity - arc.flow
                } else {
                    node.removeArc(arc.head)
                }
            }
        }
    }
}
