import Graph, { GraphData } from "../dataStructures/graph"
import { retrievePath } from "../utils"

/**
 * The Depth-First Search algorithm finds the tree of the
 * shortest directed paths from the source node to the other nodes of
 * the graph and returns it as map of the <node, previous node> pairs.
 * If a sink node is specified the algorithm return the specific
 * directed path from the source node to the sink node as an array.
 * This algorithm use a stack data structure to visit the nodes,
 * and in JavaScript can be used the 'push' and 'pop' array methods.
 * Time complexity: O(n + m) = O(m).
 * @param {Graph | GraphData} The graph to visit.
 * @param {number} The source node of the path.
 * @param {number} The sink node of the path.
 * @returns {Map<number, number>, number[]} The tree of the shortest paths or the
 * path between the source node and the sink node.
 */
export default function dfs(
    graph: Graph | GraphData,
    sourceNodeId: number,
    sinkNodeId?: number
): Map<number, number> | number[] {
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
        if (typeof sinkNodeId === "number" && node.hasArc(sinkNodeId)) {
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

    return predecessors
}
