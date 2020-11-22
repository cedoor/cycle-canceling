import Graph from "../dataStructures/graph"
import bfs from "../searchAlgorithms/bfs"

/**
 * The Edmonds–Karp algorithm (https://doi.org/10.1145%2F321694.321699) is an
 * implementation of the Ford–Fulkerson method for computing the maximum
 * flow between two nodes in a flow network. The algorithm uses the
 * Breadth First Search algorithm to find the augmenting path between the
 * source and the sink node, and increment the maximum flow with the minimum
 * arc capacity for each path creating the residual graph.
 * Time complexity: O(n * m^2).
 * @param {Graph} Graph to visit.
 * @param {number} Source node.
 * @param {number} Sink node.
 * @returns {number} Maximum flow from the source to the sink node.
 */
export default function edmondsKarp(graph: Graph, sourceNodeId: number, sinkNodeId: number): number {
    let maximumflow = 0
    let path = bfs(graph, sourceNodeId, sinkNodeId)

    // While loop stops when there is no path between the source and sink nodes.
    while (path) {
        const minimumCapacity = getMinimumCapacity(graph, path)

        maximumflow += minimumCapacity

        updateResidualCapacities(graph, path, minimumCapacity)

        // Searches another path with the new residual graph.
        path = bfs(graph, sourceNodeId, sinkNodeId)
    }

    return maximumflow
}

/**
 * Returns the arc minimum capacity of the path.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @returns {number} Minimum capacity.
 */
function getMinimumCapacity(graph: Graph, path: number[]): number {
    let minimumCapacity = Infinity

    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])

        if (arc.capacity < minimumCapacity) {
            minimumCapacity = arc.capacity
        }
    }

    return minimumCapacity
}

/**
 * Augments the path in the graph updating the capacities and
 * building a residual graph.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @param {number} Capacity to carry in the path.
 */
function updateResidualCapacities(graph: Graph, path: number[], capacity: number) {
    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])
        const adjacentNode = graph.getNode(arc.head)

        if (arc.capacity === capacity) {
            node.removeArc(adjacentNode.id)
        } else {
            arc.capacity -= capacity
        }

        if (!adjacentNode.hasArc(node.id)) {
            adjacentNode.addArc(node.id, -arc.cost, capacity, arc.maximumCapacity)
        } else {
            const reverseArc = adjacentNode.getArc(node.id)

            reverseArc.capacity += capacity
        }
    }
}
