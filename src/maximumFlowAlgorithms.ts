import Graph, { Arc, Node } from "./dataStructures/graph"
import { bfs } from "./searchAlgorithms"

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
export function edmondsKarp(graph: Graph, sourceNodeId: number, sinkNodeId: number): number {
    let maximumflow = 0

    // Converts the graph in a transformed graph.
    const [tSourceNodeId, tSinkNodeId] = setTransformedGraph(graph, sourceNodeId, sinkNodeId)

    let path = bfs(graph, tSourceNodeId, tSinkNodeId)

    // While loop stops when there is no path between the source and sink nodes.
    while (path) {
        const residualCapacity = getResidualCapacity(graph, path)

        maximumflow += residualCapacity

        sendFlow(graph, path, residualCapacity)

        // Searches another path with the new residual graph.
        path = bfs(graph, tSourceNodeId, tSinkNodeId)
    }

    // Converts the graph in the optimal flow graph.
    setOptimalGraph(graph)

    // Remove the nodes created in the transformed network.
    graph.removeNode(tSourceNodeId)
    graph.removeNode(tSinkNodeId)

    return maximumflow
}

/**
 * Returns the arc minimum capacity of the path.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @returns {number} Minimum capacity.
 */
function getResidualCapacity(graph: Graph, path: number[]): number {
    let residualCapacity = Infinity

    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])

        if (arc.capacity - arc.flow < residualCapacity) {
            residualCapacity = arc.capacity - arc.flow
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
function sendFlow(graph: Graph, path: number[], flow: number) {
    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])
        const adjacentNode = graph.getNode(arc.head)

        if (arc.capacity - arc.flow === flow) {
            node.removeArc(adjacentNode.id)
        } else {
            arc.flow += flow
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
 *
 * @param {Graph} Graph to transform.
 * @param {number} Original source node.
 * @param {number} Original sink node.
 * @returns {number[]} New source and sink nodes.
 */
function setTransformedGraph(graph: Graph, sourceNodeId: number, sinkNodeId: number): [number, number] {
    const oldSourceNode = graph.getNode(sourceNodeId)
    const oldSinkNode = graph.getNode(sinkNodeId)
    const newSourceNode = new Node(graph.size() + 1, oldSourceNode.balance)
    const newSinkNode = new Node(graph.size() + 2, oldSinkNode.balance)

    const sourceNodeArc = new Arc(oldSourceNode.id, 0, oldSourceNode.balance)
    newSourceNode.addArc(sourceNodeArc)

    const sinkNodeArc = new Arc(newSinkNode.id, 0, -oldSinkNode.balance)
    oldSinkNode.addArc(sinkNodeArc)

    graph.addNode(newSourceNode)
    graph.addNode(newSinkNode)

    return [newSourceNode.id, newSinkNode.id]
}

function setOptimalGraph(graph: Graph) {
    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.cost < 0) {
                const adjacentNode = graph.getNode(arc.head)
                const reverseArc = new Arc(node.id, -arc.cost, arc.capacity, arc.flow)

                adjacentNode.addArc(reverseArc)
            }

            node.removeArc(arc.head)
        }
    }
}
