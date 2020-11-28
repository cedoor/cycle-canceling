import { Graph, Arc } from "./dataStructures/graph"

/**
 * Retrieves the path from the sink node to the source node
 * using the predecessors map.
 * Time complexity: O(n).
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
 * Time complexity: O(m).
 * @param {Graph}
 */
export function setResidualGraph(graph: Graph) {
    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.cost >= 0) {
                if (arc.flow > 0) {
                    const adjacentNode = graph.getNode(arc.head)
                    const reverseArc = new Arc(node.id, -arc.cost, arc.capacity, arc.flow)

                    adjacentNode.addArc(reverseArc)
                }

                if (arc.capacity > arc.flow) {
                    arc.flow = arc.capacity - arc.flow
                } else {
                    node.removeArc(arc.head)
                }
            }
        }
    }
}

/**
 * Returns the arc minimum capacity of the path.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @returns {number} Minimum capacity.
 */
export function getResidualCapacity(graph: Graph, path: number[]): number {
    let residualCapacity = Infinity

    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])

        if (arc.flow < residualCapacity) {
            residualCapacity = arc.flow
        }
    }

    return residualCapacity
}

/**
 * Augments the path in the graph updating the flow of the arcs.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @param {number} Capacity to carry in the path.
 */
export function sendFlow(graph: Graph, path: number[], flow: number) {
    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])
        const adjacentNode = graph.getNode(arc.head)

        if (arc.flow === flow) {
            node.removeArc(adjacentNode.id)
        } else {
            arc.flow -= flow
        }

        if (!adjacentNode.hasArc(node.id)) {
            adjacentNode.addArc(new Arc(node.id, -arc.cost, arc.capacity, flow))
        } else {
            const reverseArc = adjacentNode.getArc(node.id)

            reverseArc.flow += flow
        }
    }
}
