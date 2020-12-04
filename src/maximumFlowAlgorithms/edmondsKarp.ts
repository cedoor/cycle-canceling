import Graph, { GraphData } from "../dataStructures/graph"
import Node from "../dataStructures/node"
import Arc from "../dataStructures/arc"
import bfs from "../searchAlgorithms/bfs"
import { getResidualCapacity, sendFlow, getResidualGraph, getOptimalGraph } from "../utils"

/**
 * The Edmonds–Karp algorithm is an implementation of the Ford–Fulkerson
 * method for computing the maximum flow between two nodes in a flow network.
 * The algorithm uses the Breadth-First Search algorithm to find the
 * augmenting path between the source and the sink node, and increment
 * the maximum flow with the minimum arc capacity for each path
 * using the residual graph. Returns the optimal graph, the maximum flow, the source and the sink nodes.
 * Time complexity: O(n * m^2).
 * @param {Graph | GraphData} The graph to visit.
 * @returns {[Graph, number, number, number]} The optimal flow graph, the maximum flow, the source and sink nodes.
 */
export default function edmondsKarp(graph: Graph | GraphData): [Graph, number, number, number] {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    // Extends the graph to calculate the feasible graph.
    const [tSourceNodeId, tSinkNodeId] = extendGraph(graph)
    const residualGraph = getResidualGraph(graph)
    let maximumflow = 0
    let path = bfs(residualGraph, tSourceNodeId, tSinkNodeId)

    // While loop stops when there is no path between the source and sink nodes.
    while (path && Array.isArray(path)) {
        const residualCapacity = getResidualCapacity(residualGraph, path)

        maximumflow += residualCapacity

        sendFlow(residualGraph, path, residualCapacity)

        // Searches another path with the new residual graph.
        path = bfs(residualGraph, tSourceNodeId, tSinkNodeId)
    }

    return [getOptimalGraph(residualGraph), maximumflow, tSourceNodeId, tSinkNodeId]
}

/**
 * Extends the graph with two new source and sink nodes.
 * For each node with balance greater than 0, it creates
 * an arc with capacity = balance from the new source node to this node.
 * For each node with balance less than 0, it creates
 * an arc with capacity = -balance from the node to the new sink nodes.
 * This allows you to compute a feasible graph, where the mass balance
 * constraint is respected.
 * Time complexity: O(n).
 * @param {Graph} The graph to extend.
 * @returns {number[]} The new source and sink nodes.
 */
function extendGraph(graph: Graph): [number, number] {
    const nodes = graph.getNodes()
    const maxId = Math.max(...nodes.map((node) => node.id))
    const newSourceNode = new Node(maxId + 1, 0)
    const newSinkNode = new Node(maxId + 2, 0)

    graph.addNode(newSourceNode)
    graph.addNode(newSinkNode)

    for (const node of nodes) {
        if (node.balance > 0) {
            const arc = new Arc(node.id, 0, node.balance)
            newSourceNode.addArc(arc)
            newSourceNode.balance += node.balance
        } else if (node.balance < 0) {
            const arc = new Arc(newSinkNode.id, 0, -node.balance)
            node.addArc(arc)
            newSinkNode.balance += node.balance
        }

        node.balance = 0
    }

    return [newSourceNode.id, newSinkNode.id]
}
