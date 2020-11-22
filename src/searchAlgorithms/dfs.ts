import Graph from "../dataStructures/graph"
import { retrievePath } from "../utils"

/**
 * Modified version of the Depth-First Search algorithm to identify
 * a specific directed path between a source node and a sink node.
 * The algorithm return an array with the nodes of the path.
 * Time complexity: O(n + m).
 * @param {Graph} Graph to visit.
 * @param {number} Sink node of the path.
 * @param {number} Source node of the path.
 * @returns {number[] | undefined} Path between source node and sink node.
 */
export default function dfs(graph: Graph, sourceNodeId: number, sinkNodeId: number): number[] | undefined {
    // Contains the visited nodes with their predecessor nodes.
    // Predecessors nodes are useful for reconstructing the path.
    const predecessors = new Map<number, number>()
    const stack = [sourceNodeId] // Initialize the stack with the source node.

    // Marks the source node as visited, with 0 as parent node.
    predecessors.set(sourceNodeId, 0)

    // While loop stops when the stack becomes empty.
    while (stack.length) {
        const nodeId = stack.pop() as number
        const node = graph.getNode(nodeId)

        // If an adjacent node is the sink node retrieves the path backwards.
        if (node.hasArc(sinkNodeId)) {
            predecessors.set(sinkNodeId, nodeId)

            return retrievePath(predecessors, sourceNodeId, sinkNodeId)
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
