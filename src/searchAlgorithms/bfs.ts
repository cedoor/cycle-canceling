import Graph from "../dataStructures/graph"
import Queue from "../dataStructures/queue"
import { retrievePath } from "./utils"

/**
 * Modified version of the Breadth-First Search algorithm to identify
 * a specific directed path between a source node and a sink node.
 * The algorithm return an array with the nodes of the path.
 * Time complexity: O(n + m).
 * @param {Graph} Graph to visit.
 * @param {number} Sink node of the path.
 * @param {number} Source node of the path.
 * @returns {number[] | undefined} Path between source node and sink node.
 */
export default function bfs(graph: Graph, sourceNode: number, sinkNode: number): number[] | undefined {
    // Contains the nodes marked as visited and their parent nodes.
    // Parent nodes are useful for reconstructing the path.
    const visitedNodes = new Map<number, number>()
    // Initialize the queue with the source node.
    const queue = new Queue()
    queue.enqueue(sourceNode)

    // Marks the source node as visited, with 0 as parent node.
    visitedNodes.set(sourceNode, 0)

    // While loop stops when the queue becomes empty.
    while (queue.size()) {
        const nodeId = queue.dequeue() as number
        const adjacentArcs = graph.getNode(nodeId).getArcs()

        // If an adjacent node is the sink node retrieves the path backwards.
        if (adjacentArcs.has(sinkNode)) {
            visitedNodes.set(sinkNode, nodeId)

            return retrievePath(visitedNodes, sinkNode)
        }

        // If there is adjacent arcs (and then nodes) marks them as visited nodes
        // and adds them to the queue.
        if (adjacentArcs.size > 0) {
            for (const adjacentArc of adjacentArcs) {
                if (!visitedNodes.has(adjacentArc[0])) {
                    visitedNodes.set(adjacentArc[0], nodeId)
                    queue.enqueue(adjacentArc[0])
                }
            }
        }
    }
}
