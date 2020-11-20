import { Graph } from "./graph"

/**
 * Modified version of the Depth-First Search algorithm to identify
 * a specific directed path between a source node and a sink node.
 * The algorithm return an array with the nodes of the path.
 * O(n + m)
 * @param: graph to visit.
 * @param: sink node of the path.
 * @param: source node of the path.
 * @returns: path between source node and sink node.
 */
export default function calculatePath(graph: Graph, sourceNode: number, sinkNode: number): number[] | undefined {
    // Contains the nodes marked as visited and their parent nodes.
    // Parent nodes are useful for reconstructing the path.
    const visitedNodes = new Map<number, number>()
    const stack = [sourceNode] // Initialize the stack with the source node.

    // Marks the source node as visited, with 0 as parent node.
    visitedNodes.set(sourceNode, 0)

    // While loop stops when the stack becomes empty.
    while (stack.length) {
        const nodeId = stack.pop() as number
        const adjacentArcs = graph.getNode(nodeId).getArcs()

        // If an adjacent node is the sink node reconstructs the path backwards.
        if (adjacentArcs.has(sinkNode)) {
            const path = [sinkNode, nodeId]

            // While loop stops when the last path node is the source node.
            while (visitedNodes.get(path[path.length - 1]) !== 0) {
                const previousNode = visitedNodes.get(path[path.length - 1]) as number

                path.push(previousNode)
            }

            // Returns a reversed array, ordered from the source to the sink node.
            return path.reverse()
        }

        // If there is adjacent arcs (and then nodes) marks them as visited nodes
        // and adds them to the stack.
        if (adjacentArcs.size > 0) {
            for (const adjacentArc of adjacentArcs) {
                if (!visitedNodes.has(adjacentArc[0])) {
                    visitedNodes.set(adjacentArc[0], nodeId)
                    stack.push(adjacentArc[0])
                }
            }
        }
    }
}
