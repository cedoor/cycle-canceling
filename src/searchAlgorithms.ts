import Graph, { GraphData } from "./dataStructures/graph"
import Queue from "./dataStructures/queue"
import { retrievePath } from "./utils"

/**
 * Modified version of the Breadth-First Search algorithm to identify
 * a specific directed path between a source node and a sink node.
 * The algorithm return an array with the nodes of the path.
 * Time complexity: O(n + m) = O(m).
 * @param {Graph | GraphData} The graph to visit.
 * @param {number} The sink node of the path.
 * @param {number} The source node of the path.
 * @returns {number[] | undefined} The path between source node and sink node.
 */
export function bfs(graph: Graph | GraphData, sourceNodeId: number, sinkNodeId: number): number[] | undefined {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    // Contains the visited nodes with their predecessor nodes.
    // Predecessors nodes are useful for reconstructing the path.
    const predecessors = new Map<number, number>()
    // Initialize the queue with the source node.
    const queue = new Queue()
    queue.enqueue(sourceNodeId)

    // Marks the source node as visited, with 0 as parent node.
    predecessors.set(sourceNodeId, -1)

    // While loop stops when the queue becomes empty.
    while (queue.size()) {
        const nodeId = queue.dequeue() as number
        const node = graph.getNode(nodeId)

        // If an adjacent node is the sink node retrieves the path backwards.
        if (node.hasArc(sinkNodeId)) {
            predecessors.set(sinkNodeId, nodeId)

            return retrievePath(predecessors, sinkNodeId)
        }

        const arcs = graph.getNode(nodeId).getArcs()

        // If there is adjacent arcs (and then nodes) marks them as visited nodes
        // and adds them to the queue.
        for (const arc of arcs) {
            if (!predecessors.has(arc.head)) {
                predecessors.set(arc.head, nodeId)
                queue.enqueue(arc.head)
            }
        }
    }
}

/**
 * Modified version of the Depth-First Search algorithm to identify
 * a specific directed path between a source node and a sink node.
 * The algorithm return an array with the nodes of the path.
 * Time complexity: O(n + m) = O(m).
 * @param {Graph | GraphData} The graph to visit.
 * @param {number} The sink node of the path.
 * @param {number} The source node of the path.
 * @returns {number[] | undefined} The path between source node and sink node.
 */
export function dfs(graph: Graph | GraphData, sourceNodeId: number, sinkNodeId: number): number[] | undefined {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    // Contains the visited nodes with their predecessor nodes.
    // Predecessors nodes are useful for reconstructing the path.
    const predecessors = new Map<number, number>()
    const stack = [sourceNodeId] // Initialize the stack with the source node.

    // Marks the source node as visited, with 0 as parent node.
    predecessors.set(sourceNodeId, -1)

    // While loop stops when the stack becomes empty.
    while (stack.length) {
        const nodeId = stack.pop() as number
        const node = graph.getNode(nodeId)

        // If an adjacent node is the sink node retrieves the path backwards.
        if (node.hasArc(sinkNodeId)) {
            predecessors.set(sinkNodeId, nodeId)

            return retrievePath(predecessors, sinkNodeId)
        }

        const arcs = node.getArcs()

        // If there is adjacent arcs (and then nodes) marks them as visited nodes
        // and adds them to the stack.
        for (const arc of arcs) {
            if (!predecessors.has(arc.head)) {
                predecessors.set(arc.head, nodeId)
                stack.push(arc.head)
            }
        }
    }
}
