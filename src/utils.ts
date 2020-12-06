import Graph from "./dataStructures/graph"
import Node from "./dataStructures/node"
import Arc from "./dataStructures/arc"

/**
 * Retrieves the path from a node of the graph to the source node
 * using the predecessors map. If there is a cycle return the cycle path.
 * Time complexity: O(n).
 * @param {Map<number, number>} The predecessor nodes.
 * @param {number} The node to start from.
 * @returns {number[]} The path from a node to the source node or a cycle path.
 */
export function retrievePath(predecessors: Map<number, number>, nodeId: number): number[] {
    // Path starts from a node id.
    const pathSet = new Set([nodeId])
    let nextNodeId = predecessors.get(nodeId) as number

    // The loop stops when the last path node is the source node.
    while (nextNodeId !== -1 && !pathSet.has(nextNodeId)) {
        pathSet.add(nextNodeId)

        nextNodeId = predecessors.get(nextNodeId) as number
    }

    let path = Array.from(pathSet)

    if (pathSet.has(nextNodeId)) {
        // Removes all the nodes outside the cycle.
        path = path.slice(path.indexOf(nextNodeId))
    }

    // Reverses the path.
    return path.reverse()
}

/**
 * Converts a graph in a residual graph, in which the new arc flow
 * represent the residual capacity.
 * Time complexity: O(m).
 * @param {Graph} The original graph.
 * @returns {Graph} The residual graph.
 */
export function getResidualGraph(graph: Graph): Graph {
    const residualGraph = graph.copy()

    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.flow > 0) {
                // Creates the reverse arc with the correct residual capacity.
                const rAdjacentNode = residualGraph.getNode(arc.head)
                rAdjacentNode.addArc(new Arc(node.id, -arc.cost, arc.capacity, arc.flow))
            }

            const rNode = residualGraph.getNode(node.id)

            // Updates the residual capacity of the arc or removes it.
            if (arc.capacity > arc.flow) {
                const rArc = rNode.getArc(arc.head)
                rArc.flow = arc.capacity - arc.flow
            } else {
                rNode.removeArc(arc.head)
            }
        }
    }

    return residualGraph
}

/**
 * Returns the arc minimum residual capacity of the path.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} The path of the nodes.
 * @returns {number} The minimum capacity.
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
 * @param {Graph} The graph containing the path.
 * @param {number[]} The path of the nodes.
 * @param {number} The flow to send in the path.
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

/**
 * Convert the residual graph in an optimal graph in which the
 * residual capacity is converted in flow.
 * Time complexity: O(m).
 * @param {Graph} The graph to update.
 * @returns {Graph} The optimal graph.
 */
export function getOptimalGraph(graph: Graph): Graph {
    const optimalGraph = new Graph()

    for (const node of graph.getNodes()) {
        optimalGraph.addNode(new Node(node.id, node.balance))
    }

    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            const adjacentNode = graph.getNode(arc.head)

            if (arc.cost < 0 || Object.is(arc.cost, -0)) {
                const oAdjacentNode = optimalGraph.getNode(arc.head)
                const reverseArc = new Arc(node.id, -arc.cost, arc.capacity, arc.flow)

                oAdjacentNode.addArc(reverseArc)
            } else if (!adjacentNode.hasArc(node.id)) {
                const oNode = optimalGraph.getNode(node.id)
                oNode.addArc(new Arc(arc.head, arc.cost, arc.capacity))
            }
        }
    }

    return optimalGraph
}
