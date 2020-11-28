import { Graph, Arc, Node, GraphData } from "./dataStructures/graph"
import { bfs } from "./searchAlgorithms"
import { getResidualCapacity, sendFlow, setResidualGraph } from "./utils"

/**
 * The Edmonds–Karp algorithm is an implementation of the Ford–Fulkerson
 * method for computing the maximum flow between two nodes in a flow network.
 * The algorithm uses the Breadth First Search algorithm to find the
 * augmenting path between the source and the sink node, and increment
 * the maximum flow with the minimum arc capacity for each path
 * using the residual graph. Returns the optimal graph and the maximum flow.
 * The last two nodes in the optimal graph are the source node and the sink node.
 * Time complexity: O(n * m^2).
 * @param {Graph | GraphData} The graph to visit.
 * @returns {[Graph, number]} The optimal flow graph and the maximum flow.
 */
export function edmondsKarp(graph: Graph | GraphData): [Graph, number] {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    // Extends the graph to calculate the feasible graph.
    const [tSourceNodeId, tSinkNodeId] = extendGraph(graph)

    setResidualGraph(graph)

    let maximumflow = 0
    let path = bfs(graph, tSourceNodeId, tSinkNodeId)

    // While loop stops when there is no path between the source and sink nodes.
    while (path) {
        const residualCapacity = getResidualCapacity(graph, path)

        maximumflow += residualCapacity

        sendFlow(graph, path, residualCapacity)

        // Searches another path with the new residual graph.
        path = bfs(graph, tSourceNodeId, tSinkNodeId)
    }

    return [getOptimalGraph(graph), maximumflow]
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
    const newSourceNode = new Node(graph.size() + 1, 0)
    const newSinkNode = new Node(graph.size() + 2, 0)

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

/**
 * Updates the residual graph removing the arcs with positive cost
 * and returns the optimal graph.
 * Time complexity: O(m).
 * @param {Graph} The graph to update.
 * @returns {Graph} The optimal graph.
 */
function getOptimalGraph(graph: Graph): Graph {
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
