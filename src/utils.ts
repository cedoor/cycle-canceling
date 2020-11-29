import { Node, Arc, Graph } from "./dataStructures/graph"

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
 * @returns {Graph}
 */
export function getResidualGraph(graph: Graph): Graph {
    const residualGraph = graph.copy()

    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.flow > 0) {
                const rAdjacentNode = residualGraph.getNode(arc.head)
                rAdjacentNode.addArc(new Arc(node.id, -arc.cost, arc.capacity, arc.flow))
            }

            const rNode = residualGraph.getNode(node.id)
            const rArc = rNode.getArc(arc.head)

            if (arc.capacity > arc.flow) {
                rArc.flow = arc.capacity - arc.flow
            } else {
                rNode.removeArc(arc.head)
            }
        }
    }

    return residualGraph
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
            adjacentNode.addArc(new Arc(node.id, -arc.cost, arc.capacity, flow, true))
        } else {
            const reverseArc = adjacentNode.getArc(node.id)

            reverseArc.flow += flow
        }
    }
}

/**
 * Updates the residual graph removing the arcs with positive cost
 * and returns the optimal graph.
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
            if (arc.cost < 0 || Object.is(arc.cost, -0)) {
                const adjacentNode = optimalGraph.getNode(arc.head)
                const reverseArc = new Arc(node.id, -arc.cost, arc.capacity, arc.flow)

                adjacentNode.addArc(reverseArc)
            }
        }
    }

    return optimalGraph
}
